import React, { useState, useEffect, useRef } from 'react';
import { Home, MapPin, Maximize, Building, Sparkles, User, CheckCircle, ChevronRight } from 'lucide-react';

// Base de données prix au m²
const prixM2Database = {
  // PARIS
  "75001": { appartement: 13200, maison: 15500 },
  "75002": { appartement: 12800, maison: 15000 },
  "75003": { appartement: 12500, maison: 14800 },
  "75004": { appartement: 13692, maison: 16000 },
  "75005": { appartement: 12900, maison: 15200 },
  "75006": { appartement: 14832, maison: 17500 },
  "75007": { appartement: 14565, maison: 17200 },
  "75008": { appartement: 13500, maison: 16000 },
  "75009": { appartement: 11800, maison: 14000 },
  "75010": { appartement: 9178, maison: 11000 },
  "75011": { appartement: 9771, maison: 11500 },
  "75012": { appartement: 9764, maison: 11600 },
  "75013": { appartement: 8558, maison: 10200 },
  "75014": { appartement: 9542, maison: 11300 },
  "75015": { appartement: 10200, maison: 12000 },
  "75016": { appartement: 12800, maison: 15200 },
  "75017": { appartement: 10800, maison: 12800 },
  "75018": { appartement: 9246, maison: 11000 },
  "75019": { appartement: 8631, maison: 10300 },
  "75020": { appartement: 8800, maison: 10500 },
  // MARSEILLE
  "13001": { appartement: 3281, maison: 4419 },
  "13002": { appartement: 3664, maison: 4860 },
  "13003": { appartement: 2030, maison: 3134 },
  "13004": { appartement: 3078, maison: 4282 },
  "13005": { appartement: 3528, maison: 5034 },
  "13006": { appartement: 4074, maison: 6113 },
  "13007": { appartement: 5615, maison: 7989 },
  "13008": { appartement: 4919, maison: 7239 },
  "13009": { appartement: 3683, maison: 5422 },
  "13010": { appartement: 2969, maison: 4240 },
  "13011": { appartement: 3713, maison: 4201 },
  "13012": { appartement: 3856, maison: 5224 },
  "13013": { appartement: 3380, maison: 3839 },
  "13014": { appartement: 2148, maison: 3121 },
  "13015": { appartement: 2161, maison: 2934 },
  "13016": { appartement: 3226, maison: 3391 },
  // LYON
  "69001": { appartement: 4860, maison: 5940 },
  "69002": { appartement: 5509, maison: 6800 },
  "69003": { appartement: 4100, maison: 5000 },
  "69004": { appartement: 4400, maison: 5400 },
  "69005": { appartement: 4200, maison: 5100 },
  "69006": { appartement: 5300, maison: 6500 },
  "69007": { appartement: 4330, maison: 4530 },
  "69008": { appartement: 3710, maison: 3860 },
  "69009": { appartement: 3900, maison: 4100 }
};

export default function EstimateurPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = hero, 1-7 = steps
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [estimation, setEstimation] = useState({ min: 0, max: 0, avg: 0 });

  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    postalCode: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    floor: '',
    totalFloors: '',
    hasElevator: false,
    hasParking: false,
    hasBalcony: false,
    hasTerrace: false,
    hasCellar: false,
    hasDoubleOrientation: false,
    hasGreenView: false,
    condition: '',
    constructionYear: '',
    dpe: 'inconnu',
    vue: '',
    luminosite: '',
    standing: '',
    nuisances: '',
    rdcType: '',
    travauxCopro: '',
    intentionVente: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rgpdConsent: false
  });

  const timeoutRef = useRef(null);

  // Fetch address suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  };

  const handleAddressInput = (value) => {
    setFormData({ ...formData, address: value });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const selectAddress = (feature) => {
    const props = feature.properties;
    setFormData({
      ...formData,
      address: props.label || props.name,
      city: props.city || '',
      postalCode: props.postcode || ''
    });
    setShowSuggestions(false);
  };

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

  const getConditionLabel = (c) => ({ neuf: 'Neuf', excellent: 'Excellent état', bon: 'Bon état', a_rafraichir: 'À rafraîchir', a_renover: 'À rénover' }[c] || c);
  const getIntentionLabel = (v) => ({ rapide: 'Vendre rapidement', prochainement: 'Vendre prochainement', plus_tard: 'Vendre plus tard', renseigner: 'Me renseigner', curiosite: 'Simple curiosité' }[v] || v);

  // Calculate estimation
  const calculateEstimation = () => {
    const surface = parseFloat(formData.surface) || 0;
    const postalCode = formData.postalCode || '';
    let basePricePerM2 = 3000;

    if (postalCode.length === 5) {
      const priceData = prixM2Database[postalCode];
      if (priceData) {
        basePricePerM2 = priceData[formData.propertyType] || basePricePerM2;
      }
    }

    let totalFactors = 0;

    // Type de bien
    if (formData.propertyType === 'maison') totalFactors += 0.20;

    // DPE
    const dpeFactors = { 'A': 0.05, 'B': 0.04, 'C': 0.03, 'D': 0, 'E': -0.03, 'F': -0.04, 'G': -0.05, 'inconnu': 0 };
    totalFactors += dpeFactors[formData.dpe] || 0;

    // Condition
    const conditionFactors = { neuf: 0.15, excellent: 0.05, bon: 0, a_rafraichir: -0.07, a_renover: -0.15 };
    totalFactors += conditionFactors[formData.condition] || 0;

    // Année
    const year = parseInt(formData.constructionYear, 10);
    if (!isNaN(year)) {
      const age = new Date().getFullYear() - year;
      if (age < 5) totalFactors += 0.10;
      else if (age > 50) totalFactors -= 0.10;
    }

    // Étage
    if (formData.propertyType === 'appartement' && formData.floor !== '') {
      const floor = parseInt(formData.floor, 10);
      if (!formData.hasElevator) {
        if (floor >= 6) totalFactors -= 0.15;
        else if (floor === 5) totalFactors -= 0.12;
        else if (floor === 4) totalFactors -= 0.10;
        else if (floor === 1) totalFactors -= 0.07;
        else if (floor === 0) {
          totalFactors -= formData.rdcType === 'rue' ? 0.17 : formData.rdcType === 'cour' ? 0.10 : 0.15;
        }
      } else {
        if (floor >= 4) totalFactors += 0.05;
        else if (floor === 1) totalFactors -= 0.03;
        else if (floor === 0) {
          totalFactors -= formData.rdcType === 'rue' ? 0.15 : formData.rdcType === 'cour' ? 0.08 : 0.10;
        }
      }
    }

    // Surface
    if (surface < 50) totalFactors += 0.07;
    else if (surface > 200) totalFactors -= 0.15;

    // Extérieurs
    if (formData.hasTerrace) totalFactors += 0.15;
    if (formData.hasBalcony) totalFactors += 0.03;

    // Vue
    if (formData.vue === 'degagee') totalFactors += 0.07;
    else if (formData.vue === 'vis_a_vis') totalFactors -= 0.05;

    // Luminosité
    if (formData.luminosite === 'sombre') totalFactors -= 0.07;

    // Standing
    if (formData.standing === 'grand') totalFactors += 0.07;
    else if (formData.standing === 'vieillissant') totalFactors -= 0.05;

    // Nuisances
    if (formData.nuisances === 'legeres') totalFactors -= 0.03;
    else if (formData.nuisances === 'importantes') totalFactors -= 0.07;

    // Autres
    if (formData.hasDoubleOrientation) totalFactors += 0.03;
    if (formData.hasGreenView) totalFactors += 0.03;
    if (formData.travauxCopro === 'oui') totalFactors -= 0.04;

    basePricePerM2 = basePricePerM2 * (1 + totalFactors);
    let basePrice = surface * basePricePerM2;

    if (formData.hasParking) basePrice += 15000;
    if (formData.hasCellar) basePrice += 3000;

    setEstimation({
      min: Math.round(basePrice * 0.9),
      max: Math.round(basePrice * 1.1),
      avg: Math.round(basePrice)
    });
  };

  // Submit lead to Make.com
  const submitLead = async () => {
    try {
      await fetch('https://hook.eu1.make.com/jawiv4pacick3ossj7t1yn1cbw5xu7r8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date_envoi: new Date().toISOString() })
      });
    } catch (e) {
      console.error('Erreur envoi lead', e);
    }
  };

  const startEstimation = () => {
    setCurrentStep(7);
    setIsLoading(true);
    const messages = [
      'Analyse de vos informations...',
      'Étude du marché local...',
      'Calcul de la fourchette de prix...',
      'Préparation de votre estimation...'
    ];
    let i = 0;
    setLoadingMessage(messages[0]);
    const interval = setInterval(() => {
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
        calculateEstimation();
        submitLead();
        setIsLoading(false);
        setShowResult(true);
      } else {
        setLoadingMessage(messages[i]);
      }
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      propertyType: '', address: '', city: '', postalCode: '', surface: '', rooms: '', bedrooms: '',
      floor: '', totalFloors: '', hasElevator: false, hasParking: false, hasBalcony: false,
      hasTerrace: false, hasCellar: false, hasDoubleOrientation: false, hasGreenView: false,
      condition: '', constructionYear: '', dpe: 'inconnu', vue: '', luminosite: '', standing: '',
      nuisances: '', rdcType: '', travauxCopro: '', intentionVente: '', firstName: '', lastName: '',
      email: '', phone: '', rgpdConsent: false
    });
    setCurrentStep(0);
    setShowResult(false);
    setEstimation({ min: 0, max: 0, avg: 0 });
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = currentStep > 0 ? (currentStep / 7) * 100 : 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-surface to-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-light/20 via-white to-surface"></div>
        <div className="absolute top-0 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[900px] h-[900px] bg-gradient-to-tr from-gold-light/15 via-gold/20 to-gold-light/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        .animate-blob { animation: blob 20s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 1s linear infinite; }
      `}</style>

      <div className="relative z-10">
        {/* NAV */}
        <nav className="backdrop-blur-2xl bg-white/70 border-b border-gold-light/40 sticky top-0 z-50 shadow-2xl shadow-primary/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-gold via-gold to-gold-light rounded-xl shadow-lg shadow-gold/50">
                  <Home className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-gold via-gold to-gold-light bg-clip-text text-transparent">Estimation Marseille</div>
                  <div className="text-xs text-text-gray font-medium">Prix au m² 2025</div>
                </div>
              </a>
              <a href="/" className="text-primary hover:text-gold transition-all font-medium">Retour au site</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* HERO - Step 0 */}
          {currentStep === 0 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-black mb-4">
                  <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Estimez gratuitement la valeur</span>
                  <br />
                  <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">de votre bien immobilier</span>
                </h1>
                <p className="text-text-gray">Obtenez une estimation en quelques clics, puis soyez recontacté par un expert.</p>
              </div>

              <div className="max-w-xl mx-auto">
                <label className="block text-sm font-semibold text-text-gray mb-2">Adresse du bien à estimer</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleAddressInput(e.target.value)}
                    placeholder="Ex : 12 rue de la République, 13001 Marseille"
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gold-light/40 rounded-2xl focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gold-light/40 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
                      {suggestions.map((s, i) => (
                        <div key={i} onClick={() => selectAddress(s)} className="px-4 py-3 hover:bg-gold/10 cursor-pointer border-b border-gold-light/20 last:border-0">
                          <div className="font-medium text-primary">{s.properties.label}</div>
                          <div className="text-sm text-text-gray">{s.properties.postcode} {s.properties.city}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => goToStep(1)}
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all shadow-xl shadow-gold/30"
                >
                  Estimer mon bien
                </button>

                <p className="text-center text-sm text-text-gray mt-4">Estimation gratuite, sans engagement. Vos données restent confidentielles.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { number: '+1 247', label: 'estimations' },
                  { number: '24h', label: 'pour être rappelé' },
                  { number: '4.8/5', label: 'satisfaction' }
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 backdrop-blur-xl bg-white/50 rounded-xl border border-gold-light/30">
                    <div className="text-2xl font-black text-gold">{s.number}</div>
                    <div className="text-xs text-text-gray">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {currentStep > 0 && currentStep < 7 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-primary">Estimation de votre bien</span>
                <span className="text-sm text-text-gray">Étape {currentStep} sur 7</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-center text-xs text-text-gray mt-2">Moins de 2 minutes - 100% gratuit</p>
            </div>
          )}

          {/* STEP 1 - Type de bien */}
          {currentStep === 1 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><Home className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Quel type de bien souhaitez-vous estimer ?</h2>
                  <p className="text-text-gray text-sm">Choisissez la catégorie correspondant à votre logement.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {['appartement', 'maison'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, propertyType: type })}
                    className={`p-6 border-2 rounded-2xl text-center transition-all ${formData.propertyType === type ? 'border-gold bg-gold/10 shadow-lg' : 'border-gold-light/40 hover:border-gold/50'}`}
                  >
                    {type === 'appartement' ? <Building className="mx-auto text-gold mb-3" size={36} /> : <Home className="mx-auto text-gold mb-3" size={36} />}
                    <span className="font-bold text-primary capitalize">{type}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(0)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(2)}
                  disabled={!formData.propertyType}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 - Adresse */}
          {currentStep === 2 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><MapPin className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Où se situe votre bien ?</h2>
                  <p className="text-text-gray text-sm">Indiquez l'adresse exacte pour une estimation fidèle.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-primary mb-1">Adresse</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleAddressInput(e.target.value)}
                    placeholder="Ex: 12 rue de la République"
                    className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gold-light/40 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
                      {suggestions.map((s, i) => (
                        <div key={i} onClick={() => selectAddress(s)} className="px-4 py-3 hover:bg-gold/10 cursor-pointer border-b border-gold-light/20 last:border-0">
                          <div className="font-medium text-primary">{s.properties.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Ville</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex: Marseille"
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Code postal</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="Ex: 13001"
                      maxLength={5}
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(1)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(3)}
                  disabled={!formData.address || !formData.city || !formData.postalCode}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - Surface */}
          {currentStep === 3 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><Maximize className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Quelle est la surface de votre bien ?</h2>
                  <p className="text-text-gray text-sm">Précisez les caractéristiques principales.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Surface habitable (m²)</label>
                  <input
                    type="number"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    placeholder="Ex: 75"
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Nombre de pièces</label>
                    <input
                      type="number"
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                      placeholder="Ex: 3"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Nombre de chambres</label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      placeholder="Ex: 2"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(2)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(4)}
                  disabled={!formData.surface || !formData.rooms || !formData.bedrooms}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 - Caractéristiques */}
          {currentStep === 4 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><Building className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Caractéristiques du bien</h2>
                  <p className="text-text-gray text-sm">Précisez les équipements et la localisation.</p>
                </div>
              </div>

              {formData.propertyType === 'appartement' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Étage</label>
                    <input
                      type="number"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      placeholder="Ex: 2"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Étages total</label>
                    <input
                      type="number"
                      value={formData.totalFloors}
                      onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                      placeholder="Ex: 5"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {formData.propertyType === 'appartement' && formData.floor === '0' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-primary mb-2">Type de rez-de-chaussée</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['rue', 'cour'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, rdcType: type })}
                        className={`p-3 border-2 rounded-xl font-medium transition-all ${formData.rdcType === type ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                      >
                        Côté {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Équipements et annexes</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hasElevator', label: 'Ascenseur', show: formData.propertyType === 'appartement' },
                    { key: 'hasParking', label: 'Parking / Garage', show: true },
                    { key: 'hasBalcony', label: 'Balcon', show: true },
                    { key: 'hasTerrace', label: 'Terrasse', show: true },
                    { key: 'hasCellar', label: 'Cave', show: true },
                    { key: 'hasDoubleOrientation', label: 'Double orientation', show: true },
                    { key: 'hasGreenView', label: 'Vue espace vert', show: true }
                  ].filter(item => item.show).map((item) => (
                    <label key={item.key} className="flex items-center gap-3 p-3 border-2 border-gold-light/40 rounded-xl cursor-pointer hover:border-gold/50 transition-all">
                      <input
                        type="checkbox"
                        checked={formData[item.key]}
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        className="w-5 h-5 accent-gold"
                      />
                      <span className="text-sm text-primary">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vue */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Vue depuis le logement</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: 'degagee', l: 'Dégagée' }, { v: 'standard', l: 'Standard' }, { v: 'vis_a_vis', l: 'Vis-à-vis' }].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, vue: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.vue === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Luminosité */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Luminosité</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: 'lumineux', l: 'Très lumineux' }, { v: 'correct', l: 'Correcte' }, { v: 'sombre', l: 'Sombre' }].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, luminosite: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.luminosite === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Standing */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Standing de l'immeuble</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: 'grand', l: 'Grand standing' }, { v: 'standard', l: 'Standard' }, { v: 'vieillissant', l: 'Vieillissant' }].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, standing: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.standing === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nuisances */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Nuisances sonores</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: 'aucune', l: 'Aucune' }, { v: 'legeres', l: 'Légères' }, { v: 'importantes', l: 'Importantes' }].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, nuisances: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.nuisances === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(3)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(5)}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 - État */}
          {currentStep === 5 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><Sparkles className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">État du bien</h2>
                  <p className="text-text-gray text-sm">Dernières informations pour affiner l'estimation.</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">État général</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { v: 'neuf', l: 'Neuf' },
                    { v: 'excellent', l: 'Excellent' },
                    { v: 'bon', l: 'Bon état' },
                    { v: 'a_rafraichir', l: 'À rafraîchir' },
                    { v: 'a_renover', l: 'À rénover' }
                  ].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, condition: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.condition === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-1">Année de construction</label>
                <input
                  type="number"
                  value={formData.constructionYear}
                  onChange={(e) => setFormData({ ...formData, constructionYear: e.target.value })}
                  placeholder="Ex: 1990"
                  min="1800"
                  className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-1">Performance énergétique (DPE)</label>
                <select
                  value={formData.dpe}
                  onChange={(e) => setFormData({ ...formData, dpe: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                >
                  <option value="inconnu">Je ne sais pas</option>
                  <option value="A">A - Excellent</option>
                  <option value="B">B - Très bien</option>
                  <option value="C">C - Bien</option>
                  <option value="D">D - Moyen</option>
                  <option value="E">E - Passable</option>
                  <option value="F">F - Médiocre</option>
                  <option value="G">G - Très mauvais</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Travaux de copropriété prévus</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: 'non', l: 'Non / Ne sait pas' }, { v: 'oui', l: 'Oui' }].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, travauxCopro: item.v })}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${formData.travauxCopro === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      {item.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(4)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(6)}
                  disabled={!formData.condition || !formData.constructionYear}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 6 - Contact */}
          {currentStep === 6 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><User className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Recevez votre estimation</h2>
                  <p className="text-text-gray text-sm">Quelques informations pour personnaliser l'accompagnement.</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">Intention de vente</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { v: 'rapide', l: 'Vendre rapidement', d: '0-3 mois' },
                    { v: 'prochainement', l: 'Vendre prochainement', d: '3-6 mois' },
                    { v: 'plus_tard', l: 'Vendre plus tard', d: '6-12 mois' },
                    { v: 'renseigner', l: 'Me renseigner', d: 'Connaître la valeur' },
                    { v: 'curiosite', l: 'Simple curiosité', d: 'Estimation indicative' }
                  ].map((item) => (
                    <button
                      key={item.v}
                      onClick={() => setFormData({ ...formData, intentionVente: item.v })}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${formData.intentionVente === item.v ? 'border-gold bg-gold/10' : 'border-gold-light/40 hover:border-gold/50'}`}
                    >
                      <div className="font-medium text-primary">{item.l}</div>
                      <div className="text-xs text-text-gray">{item.d}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Ex: Jean"
                    className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Ex: Dupont"
                    className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-primary mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: jean.dupont@email.com"
                  className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ex: 06 12 34 56 78"
                  className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-3 p-4 border-2 border-gold-light/40 rounded-xl cursor-pointer hover:border-gold/50 transition-all mb-6">
                <input
                  type="checkbox"
                  checked={formData.rgpdConsent}
                  onChange={(e) => setFormData({ ...formData, rgpdConsent: e.target.checked })}
                  className="w-5 h-5 accent-gold mt-0.5"
                />
                <span className="text-sm text-primary">J'accepte que mes données soient utilisées pour être recontacté(e) dans le cadre de cette estimation.</span>
              </label>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(5)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={startEstimation}
                  disabled={!formData.intentionVente || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.rgpdConsent}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Voir mon estimation
                </button>
              </div>
            </div>
          )}

          {/* STEP 7 - Résultat */}
          {currentStep === 7 && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              {isLoading && (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-gold-light border-t-gold rounded-full animate-spin-slow mx-auto mb-6"></div>
                  <p className="text-xl font-bold text-primary mb-2">Estimation en cours...</p>
                  <p className="text-text-gray">{loadingMessage}</p>
                </div>
              )}

              {showResult && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4">
                      <CheckCircle className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Votre estimation est prête</h2>
                    <p className="text-text-gray">Voici la fourchette de prix estimée pour votre bien.</p>
                  </div>

                  <div className="bg-gradient-to-br from-gold/10 to-gold-light/10 rounded-2xl p-8 text-center mb-8">
                    <p className="text-sm text-text-gray mb-2">Fourchette d'estimation</p>
                    <p className="text-4xl font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-2">{formatPrice(estimation.avg)}</p>
                    <p className="text-sm text-text-gray">Prix moyen estimé</p>
                    <div className="flex justify-center gap-8 mt-4 text-sm">
                      <div><span className="text-text-gray">Min:</span> <span className="font-bold text-primary">{formatPrice(estimation.min)}</span></div>
                      <div><span className="text-text-gray">Max:</span> <span className="font-bold text-primary">{formatPrice(estimation.max)}</span></div>
                    </div>
                  </div>

                  <div className="bg-surface/50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-primary mb-4">Récapitulatif de votre bien</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Type</span>
                        <span className="font-medium text-primary capitalize">{formData.propertyType}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Adresse</span>
                        <span className="font-medium text-primary">{formData.address}, {formData.postalCode} {formData.city}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Surface</span>
                        <span className="font-medium text-primary">{formData.surface} m²</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Pièces</span>
                        <span className="font-medium text-primary">{formData.rooms} pièces ({formData.bedrooms} chambres)</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">État</span>
                        <span className="font-medium text-primary">{getConditionLabel(formData.condition)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-text-gray">Construction</span>
                        <span className="font-medium text-primary">{formData.constructionYear}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={resetForm}
                      className="px-8 py-4 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all shadow-xl shadow-gold/30"
                    >
                      Nouvelle estimation
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="border-t border-gold-light/40 backdrop-blur-xl bg-white/70 py-8 px-6 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-text-gray">&copy; 2025 Estimation Immobilière Marseille</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

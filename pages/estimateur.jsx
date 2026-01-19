import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Home, MapPin, Maximize, Building, Sparkles, User, CheckCircle, Map, Calendar } from 'lucide-react';

// Base de données complète des prix par quartier à Marseille
const PRIX_QUARTIERS = {
  "13001": {
    "Belsunce": { appartement: 2872, maison: 3106 },
    "Le Chapitre": { appartement: 3110, maison: 4266 },
    "Noailles": { appartement: 3198, maison: 4066 },
    "Opéra": { appartement: 3907, maison: 6159 },
    "Saint-Charles": { appartement: 3371, maison: 4634 },
    "Thiers": { appartement: 3368, maison: 4947 }
  },
  "13002": {
    "Les Grands Carmes": { appartement: 3245, maison: 4662 },
    "L'Hôtel-de-Ville": { appartement: 4133, maison: 5284 },
    "La Joliette": { appartement: 3138, maison: 4393 }
  },
  "13003": {
    "Belle-de-Mai": { appartement: 2072, maison: 3485 },
    "Saint-Mauront": { appartement: 1805, maison: 2844 },
    "La Villette": { appartement: 2332, maison: 2871 }
  },
  "13004": {
    "Les Chartreux": { appartement: 2930, maison: 4592 },
    "Les Chutes-Lavie": { appartement: 2813, maison: 3918 },
    "Les Cinq-Avenues": { appartement: 3330, maison: 4395 },
    "La Blancarde": { appartement: 3099, maison: 4128 }
  },
  "13005": {
    "Baille": { appartement: 3523, maison: 5041 },
    "Le Camas": { appartement: 3596, maison: 4999 },
    "La Conception": { appartement: 3491, maison: 5320 },
    "Saint-Pierre": { appartement: 3322, maison: 4505 }
  },
  "13006": {
    "Castellane": { appartement: 3933, maison: 6414 },
    "Lodi": { appartement: 3678, maison: 4932 },
    "Notre-Dame-du-Mont": { appartement: 3594, maison: 5077 },
    "Palais-de-Justice": { appartement: 4384, maison: 6985 },
    "Préfecture": { appartement: 3743, maison: 5602 },
    "Vauban": { appartement: 4560, maison: 6850 }
  },
  "13007": {
    "Bompard": { appartement: 5725, maison: 8348 },
    "Endoume": { appartement: 6062, maison: 8159 },
    "Les Îles (Frioul)": { appartement: 5265, maison: 9008 },
    "Le Pharo": { appartement: 4599, maison: 5491 },
    "Le Roucas-Blanc": { appartement: 6526, maison: 9040 },
    "Saint-Lambert": { appartement: 4895, maison: 7408 },
    "Saint-Victor": { appartement: 4563, maison: 7162 }
  },
  "13008": {
    "Bonneveine": { appartement: 4751, maison: 7132 },
    "Les Goudes": { appartement: 3811, maison: 6592 },
    "Montredon": { appartement: 5670, maison: 7717 },
    "Périer": { appartement: 4848, maison: 7362 },
    "La Plage": { appartement: 6045, maison: 9163 },
    "La Pointe Rouge": { appartement: 5163, maison: 7476 },
    "Le Rouet": { appartement: 5163, maison: 7476 },
    "Saint-Giniez": { appartement: 4749, maison: 7705 },
    "Sainte-Anne": { appartement: 4468, maison: 6725 },
    "Vieille-Chapelle": { appartement: 5053, maison: 6748 }
  },
  "13009": {
    "Les Baumettes": { appartement: 3774, maison: 5103 },
    "Le Cabot": { appartement: 3981, maison: 5353 },
    "Carpiagne": { appartement: 3661, maison: 5406 },
    "Mazargues": { appartement: 3891, maison: 5475 },
    "La Panouse": { appartement: 2880, maison: 5484 },
    "Le Redon": { appartement: 3812, maison: 5261 },
    "Sainte-Marguerite": { appartement: 3292, maison: 5544 },
    "Sormiou": { appartement: 4201, maison: 5287 },
    "Vaufrèges": { appartement: 2895, maison: 5173 }
  },
  "13010": {
    "La Capelette": { appartement: 2980, maison: 3665 },
    "Menpenti": { appartement: 3275, maison: 4357 },
    "Pont-de-Vivaux": { appartement: 2748, maison: 4221 },
    "Saint-Loup": { appartement: 2838, maison: 4295 },
    "Saint-Tronc": { appartement: 2978, maison: 4922 },
    "La Timone": { appartement: 3304, maison: 4106 }
  },
  "13011": {
    "Les Accates": { appartement: 4729, maison: 4774 },
    "La Barasse": { appartement: 3615, maison: 3894 },
    "Les Camoins": { appartement: 4421, maison: 4683 },
    "Éoures": { appartement: 4355, maison: 5130 },
    "La Millière": { appartement: 3108, maison: 3749 },
    "La Pomme": { appartement: 3047, maison: 4073 },
    "Saint-Marcel": { appartement: 3197, maison: 3764 },
    "Saint-Menet": { appartement: 4481, maison: 4416 },
    "La Treille": { appartement: 4276, maison: 4735 },
    "La Valbarelle": { appartement: 2989, maison: 3665 },
    "La Valentine": { appartement: 4172, maison: 4645 }
  },
  "13012": {
    "Les Caillols": { appartement: 3937, maison: 4646 },
    "La Fourragère": { appartement: 3734, maison: 5233 },
    "Montolivet": { appartement: 3596, maison: 5230 },
    "Saint-Barnabé": { appartement: 4158, maison: 5783 },
    "Saint-Jean-du-Désert": { appartement: 3694, maison: 4716 },
    "Saint-Julien": { appartement: 3577, maison: 4949 },
    "Les Trois-Lucs": { appartement: 4166, maison: 4972 }
  }
};

const PRIX_FALLBACK = {
  "13013": { appartement: 3380, maison: 3839 },
  "13014": { appartement: 2148, maison: 3121 },
  "13015": { appartement: 2161, maison: 2934 },
  "13016": { appartement: 3226, maison: 3391 }
};

export default function EstimateurPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [estimation, setEstimation] = useState({ min: 0, max: 0, avg: 0 });
  const [quartiers, setQuartiers] = useState([]);
  const [hasQuartierStep, setHasQuartierStep] = useState(false);
  const [initializedFromUrl, setInitializedFromUrl] = useState(false);

  const totalSteps = hasQuartierStep ? 8 : 7;

  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    postalCode: '',
    quartier: '',
    surface: '',
    surfaceExterieur: '',
    rooms: '',
    bedrooms: '',
    floor: '',
    totalFloors: '',
    hasElevator: false,
    hasParking: false,
    hasBalcony: false,
    hasTerrace: false,
    hasCellar: false,
    condition: '',
    constructionYear: '',
    dpe: 'inconnu',
    vue: '',
    luminosite: '',
    rdcType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const timeoutRef = useRef(null);

  // Récupérer l'adresse depuis l'URL au chargement
  useEffect(() => {
    if (router.isReady && !initializedFromUrl) {
      const { address, city, postalCode } = router.query;
      if (address || city || postalCode) {
        setFormData(prev => ({
          ...prev,
          address: address || '',
          city: city || '',
          postalCode: postalCode || ''
        }));

        // Si on a un code postal, charger les quartiers
        if (postalCode && PRIX_QUARTIERS[postalCode]) {
          setQuartiers(Object.keys(PRIX_QUARTIERS[postalCode]));
          setHasQuartierStep(true);
        }

        setInitializedFromUrl(true);
      }
    }
  }, [router.isReady, router.query, initializedFromUrl]);

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

  const getConditionLabel = (c) => ({ neuf: 'Neuf', excellent: 'Excellent', bon: 'Bon état', a_rafraichir: 'À rafraîchir', a_renover: 'À rénover' }[c] || c);

  // Load quartiers when postal code changes
  const loadQuartiers = (postalCode) => {
    if (PRIX_QUARTIERS[postalCode]) {
      setQuartiers(Object.keys(PRIX_QUARTIERS[postalCode]));
      setHasQuartierStep(true);
      return true;
    }
    setQuartiers([]);
    setHasQuartierStep(false);
    return false;
  };

  // Calculate estimation
  const calculateEstimation = () => {
    const surface = parseFloat(formData.surface) || 0;
    const postalCode = formData.postalCode;
    const quartier = formData.quartier;
    const propertyType = formData.propertyType;

    let basePricePerM2;

    if (PRIX_QUARTIERS[postalCode] && quartier && PRIX_QUARTIERS[postalCode][quartier]) {
      basePricePerM2 = PRIX_QUARTIERS[postalCode][quartier][propertyType];
    } else if (PRIX_FALLBACK[postalCode]) {
      basePricePerM2 = PRIX_FALLBACK[postalCode][propertyType];
    } else {
      basePricePerM2 = 3500;
    }

    let totalFactors = 0;

    // Type de bien
    if (propertyType === 'maison') totalFactors += 0.20;

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
    if (propertyType === 'appartement' && formData.floor !== '') {
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
    if (formData.hasBalcony) totalFactors += 0.03;
    if (formData.hasTerrace) totalFactors += 0.08;
    if (formData.hasCellar) totalFactors += 0.03;

    // Vue
    if (formData.vue === 'degagee') totalFactors += 0.07;
    else if (formData.vue === 'vis_a_vis') totalFactors -= 0.05;

    // Luminosité
    if (formData.luminosite === 'sombre') totalFactors -= 0.07;

    basePricePerM2 = basePricePerM2 * (1 + totalFactors);
    let basePrice = surface * basePricePerM2;

    if (formData.hasParking) basePrice += 7000;

    setEstimation({
      min: Math.round(basePrice * 0.85),
      max: Math.round(basePrice * 1.15),
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
    const resultStep = hasQuartierStep ? 8 : 7;
    goToStep(resultStep);
    setIsLoading(true);

    setTimeout(() => {
      calculateEstimation();
      submitLead();
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      propertyType: '', address: '', city: '', postalCode: '', quartier: '',
      surface: '', surfaceExterieur: '', rooms: '', bedrooms: '', floor: '', totalFloors: '',
      hasElevator: false, hasParking: false, hasBalcony: false, hasTerrace: false,
      hasCellar: false, condition: '', constructionYear: '', dpe: 'inconnu',
      vue: '', luminosite: '', rdcType: '', firstName: '', lastName: '',
      email: '', phone: ''
    });
    setCurrentStep(1);
    setShowResult(false);
    setEstimation({ min: 0, max: 0, avg: 0 });
    setQuartiers([]);
    setHasQuartierStep(false);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Submit = () => {
    const hasQuartiers = loadQuartiers(formData.postalCode);
    if (hasQuartiers) {
      goToStep('2b');
    } else {
      goToStep(3);
    }
  };

  const getBackStep = (fromStep) => {
    if (fromStep === 3 && hasQuartierStep) return '2b';
    if (fromStep === 3) return 2;
    return fromStep - 1;
  };

  const progress = currentStep === '2b' ? (2.5 / totalSteps) * 100 : (parseInt(currentStep) / totalSteps) * 100;
  const stepDisplay = currentStep === '2b' ? '2b' : currentStep;

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

          {/* Progress Bar */}
          {currentStep !== 7 && currentStep !== 8 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-primary">Estimation de votre bien</span>
                <span className="text-sm text-text-gray">Étape {stepDisplay} sur {totalSteps}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-center text-xs text-text-gray mt-2">Moins de 2 minutes - Gratuit et sans engagement</p>
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
                <button disabled className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium opacity-50 cursor-not-allowed">Retour</button>
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
                          <div className="text-sm text-text-gray">{s.properties.postcode} {s.properties.city}</div>
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
                  onClick={handleStep2Submit}
                  disabled={!formData.address || !formData.city || !formData.postalCode}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* STEP 2B - Quartiers */}
          {currentStep === '2b' && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl"><Map className="text-gold" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Dans quel quartier se situe votre bien ?</h2>
                  <p className="text-text-gray text-sm">Sélectionnez le quartier correspondant.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {quartiers.map((q) => (
                  <button
                    key={q}
                    onClick={() => setFormData({ ...formData, quartier: q })}
                    className={`p-4 border-2 rounded-xl text-left font-medium transition-all ${formData.quartier === q ? 'border-gold bg-gold/10 shadow-lg' : 'border-gold-light/40 hover:border-gold/50'}`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(2)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={() => goToStep(3)}
                  disabled={!formData.quartier}
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
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Surface jardin/extérieur (m²) <span className="text-text-gray font-normal">- optionnel</span></label>
                  <input
                    type="number"
                    value={formData.surfaceExterieur}
                    onChange={(e) => setFormData({ ...formData, surfaceExterieur: e.target.value })}
                    placeholder="Ex: 50"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gold-light/40 rounded-xl focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(getBackStep(3))} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
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
                  <p className="text-text-gray text-sm">Équipements et localisation dans le bâtiment.</p>
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
                <label className="block text-sm font-medium text-primary mb-2">Équipements</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hasElevator', label: 'Ascenseur', show: formData.propertyType === 'appartement' },
                    { key: 'hasParking', label: 'Parking / Garage', show: true },
                    { key: 'hasBalcony', label: 'Balcon', show: true },
                    { key: 'hasTerrace', label: 'Terrasse', show: true },
                    { key: 'hasCellar', label: 'Cave', show: true }
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
                <label className="block text-sm font-medium text-primary mb-2">Vue</label>
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
                <label className="block text-sm font-medium text-primary mb-1">DPE</label>
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
                  <p className="text-text-gray text-sm">Vos coordonnées pour recevoir l'estimation.</p>
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
                  placeholder="Ex: jean@email.com"
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

              <div className="flex justify-between mt-8">
                <button onClick={() => goToStep(5)} className="px-6 py-3 border-2 border-gold-light/40 rounded-xl font-medium hover:border-gold transition-all">Retour</button>
                <button
                  onClick={startEstimation}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                  className="px-8 py-3 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Voir mon estimation
                </button>
              </div>
            </div>
          )}

          {/* STEP 7/8 - Résultat */}
          {(currentStep === 7 || currentStep === 8) && (
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 shadow-2xl">
              {isLoading && (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-gold-light border-t-gold rounded-full animate-spin-slow mx-auto mb-6"></div>
                  <p className="text-xl font-bold text-primary mb-2">Calcul de votre estimation...</p>
                  <p className="text-text-gray">Analyse des données du marché local.</p>
                </div>
              )}

              {showResult && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4">
                      <CheckCircle className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Votre estimation est prête</h2>
                    <p className="text-text-gray">Fourchette de prix estimée pour votre bien.</p>
                  </div>

                  <div className="bg-gradient-to-br from-gold/10 to-gold-light/10 rounded-2xl p-8 text-center mb-8">
                    <p className="text-4xl font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4">{formatPrice(estimation.avg)}</p>
                    <div className="flex justify-center gap-8 text-sm">
                      <div><span className="text-text-gray">Min:</span> <span className="font-bold text-primary">{formatPrice(estimation.min)}</span></div>
                      <div><span className="text-text-gray">Max:</span> <span className="font-bold text-primary">{formatPrice(estimation.max)}</span></div>
                    </div>
                  </div>

                  <div className="bg-surface/50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-primary mb-4">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Type</span>
                        <span className="font-medium text-primary capitalize">{formData.propertyType}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Adresse</span>
                        <span className="font-medium text-primary">{formData.address}</span>
                      </div>
                      {formData.quartier && (
                        <div className="flex justify-between py-2 border-b border-gold-light/30">
                          <span className="text-text-gray">Quartier</span>
                          <span className="font-medium text-primary">{formData.quartier}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-gold-light/30">
                        <span className="text-text-gray">Surface</span>
                        <span className="font-medium text-primary">{formData.surface} m²</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-text-gray">État</span>
                        <span className="font-medium text-primary">{getConditionLabel(formData.condition)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://calendly.com/henzo-delbue-llinaresimmo/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all shadow-xl shadow-gold/30"
                    >
                      <Calendar size={20} />
                      Prendre rendez-vous
                    </a>
                    <button
                      onClick={resetForm}
                      className="px-8 py-4 border-2 border-gold text-gold rounded-2xl font-bold hover:bg-gold/10 transition-all"
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

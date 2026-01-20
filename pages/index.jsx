import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import { Search, Home, MapPin, TrendingUp, CheckCircle, Calendar, Shield, Award, Users, ChevronRight, Star, Sparkles, BarChart3, Zap } from 'lucide-react';

// Base de données complète des prix par quartier à Marseille (111 quartiers)
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
  },
  "13013": {
    "Les Crottes": { appartement: 2215, maison: 3352 },
    "Les Médecins": { appartement: 3547, maison: 4048 },
    "Les Olives": { appartement: 3762, maison: 4125 },
    "Palama": { appartement: 3211, maison: 3587 },
    "La Rose": { appartement: 3488, maison: 3972 },
    "Saint-Jérôme": { appartement: 3658, maison: 4015 },
    "Saint-Just": { appartement: 3127, maison: 3544 },
    "Saint-Mitre": { appartement: 3265, maison: 3689 },
    "Château-Gombert": { appartement: 3845, maison: 4258 },
    "Malpassé": { appartement: 3025, maison: 3456 }
  },
  "13014": {
    "Les Arnavaux": { appartement: 2045, maison: 2985 },
    "Le Canet": { appartement: 2156, maison: 3125 },
    "Le Merlan": { appartement: 2089, maison: 3045 },
    "Saint-Barthélémy": { appartement: 2234, maison: 3256 },
    "Sainte-Marthe": { appartement: 2312, maison: 3412 },
    "Saint-Joseph": { appartement: 2156, maison: 3089 }
  },
  "13015": {
    "La Calade": { appartement: 2145, maison: 2856 },
    "La Castellane": { appartement: 1956, maison: 2645 },
    "La Viste": { appartement: 2078, maison: 2789 },
    "Notre-Dame-Limite": { appartement: 2234, maison: 3012 },
    "Plan-d'Aou": { appartement: 2012, maison: 2756 },
    "Saint-Antoine": { appartement: 2389, maison: 3125 },
    "Saint-Louis": { appartement: 2145, maison: 2945 },
    "Verduron": { appartement: 2067, maison: 2834 }
  },
  "13016": {
    "L'Estaque": { appartement: 3456, maison: 3658 },
    "Saint-André": { appartement: 3125, maison: 3325 },
    "Saint-Henri": { appartement: 3089, maison: 3256 },
    "Mourepiane": { appartement: 3234, maison: 3425 }
  }
};

export default function LandingPageEstimation() {
  const router = useRouter();
  const [searchQuartier, setSearchQuartier] = useState('');
  const [selectedType, setSelectedType] = useState('appartement');
  const [selectedArrondissement, setSelectedArrondissement] = useState('tous');

  // États pour l'autocomplétion d'adresse
  const [addressInput, setAddressInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const timeoutRef = useRef(null);

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

  // Fetch address suggestions from API
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
    setAddressInput(value);
    setSelectedAddress(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const selectAddress = (feature) => {
    const props = feature.properties;
    setAddressInput(props.label || props.name);
    setSelectedAddress({
      address: props.label || props.name,
      city: props.city || '',
      postalCode: props.postcode || ''
    });
    setShowSuggestions(false);
  };

  const handleEstimerClick = () => {
    if (selectedAddress) {
      // Passer l'adresse via les query params
      router.push({
        pathname: '/estimateur',
        query: {
          address: selectedAddress.address,
          city: selectedAddress.city,
          postalCode: selectedAddress.postalCode
        }
      });
    } else {
      // Rediriger sans adresse pré-remplie
      router.push('/estimateur');
    }
  };

  const getAllQuartiers = () => {
    const quartiers = [];
    Object.entries(PRIX_QUARTIERS).forEach(([code, quartiersList]) => {
      Object.entries(quartiersList).forEach(([nom, prix]) => {
        quartiers.push({ nom, arrondissement: code, prixAppart: prix.appartement, prixMaison: prix.maison });
      });
    });
    return quartiers
      .filter(q => q.nom.toLowerCase().includes(searchQuartier.toLowerCase()))
      .filter(q => selectedArrondissement === 'tous' || q.arrondissement === selectedArrondissement)
      .sort((a, b) => {
        // Trier par prix décroissant
        const prixA = selectedType === 'appartement' ? a.prixAppart : a.prixMaison;
        const prixB = selectedType === 'appartement' ? b.prixAppart : b.prixMaison;
        return prixB - prixA;
      });
  };

  const getArrondissements = () => {
    return Object.keys(PRIX_QUARTIERS).sort((a, b) => parseInt(a) - parseInt(b));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-surface to-white">
      
      {/* ANIMATED 3D FLUID BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-light/20 via-white to-surface"></div>
        <div className="absolute top-0 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[900px] h-[900px] bg-gradient-to-tr from-gold-light/15 via-gold/20 to-gold-light/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gold/15 via-gold-light/15 to-gold/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-tl from-gold-light/20 via-gold/15 to-gold-light/15 rounded-full blur-3xl animate-blob animation-delay-6000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-gold/35 rounded-full animate-float" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`, animationDuration: `${10 + Math.random() * 20}s`
            }}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 0.3; } 90% { opacity: 0.3; } 50% { transform: translateY(-100vh) translateX(50px); opacity: 0.5; } }
        .animate-blob { animation: blob 20s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; } .animation-delay-4000 { animation-delay: 4s; } .animation-delay-6000 { animation-delay: 6s; }
        .animate-float { animation: float linear infinite; }
      `}</style>

      <div className="relative z-10">

        {/* NAV */}
        <Navigation />

        {/* HERO */}
        <section className="pt-20 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2.5 px-6 py-3 backdrop-blur-2xl bg-white/70 border border-gold-light/40 rounded-full shadow-2xl shadow-gold/20">
                <div className="flex items-center gap-1.5"><CheckCircle className="text-green-400" size={18} /><span className="text-sm font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">100% Gratuit</span></div>
                <div className="w-px h-4 bg-gold-light"></div>
                <div className="flex items-center gap-1.5"><Shield className="text-gold" size={18} /><span className="text-sm font-semibold text-primary">Sans Engagement</span></div>
                <div className="w-px h-4 bg-gold-light"></div>
                <div className="flex items-center gap-1.5"><TrendingUp className="text-gold" size={18} /><span className="text-sm font-semibold text-primary">Données 2025</span></div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
                    <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent drop-shadow-2xl">Estimez votre bien</span>
                    <br />
                    <span className="bg-gradient-to-r from-gold via-gold to-gold-light bg-clip-text text-transparent drop-shadow-2xl">à Marseille</span>
                  </h1>
                  <p className="text-xl text-primary leading-relaxed max-w-lg">Obtenez une estimation précise et gratuite en 2 minutes. Données réelles du marché marseillais, <span className="font-bold text-gold">111 quartiers</span> couverts.</p>
                </div>
                
                <div className="backdrop-blur-2xl bg-white/70 border border-gold-light/40 rounded-3xl p-6 shadow-2xl shadow-primary/10">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 group-focus-within:text-gold transition-colors z-10" size={20} />
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => handleAddressInput(e.target.value)}
                        placeholder="Adresse de votre bien à Marseille..."
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-gold-light/40 rounded-2xl focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/30 transition-all text-primary placeholder:text-text-gray font-medium"
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
                      onClick={handleEstimerClick}
                      className="relative px-8 py-4 bg-gradient-to-r from-gold via-gold to-gold-light text-white rounded-2xl font-bold overflow-hidden group shadow-2xl shadow-gold/50 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center gap-2">Estimer<ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-5 text-sm">
                    <div className="flex items-center gap-2 text-primary"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div><span className="font-medium">Résultat immédiat</span></div>
                    <div className="flex items-center gap-2 text-primary"><CheckCircle size={16} className="text-green-400" /><span className="font-medium">111 quartiers</span></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Users, number: '+1 247', label: 'Estimations', color: 'from-gold to-gold-light' },
                    { icon: Star, number: '4.8/5', label: 'Satisfaction', color: 'from-amber-500 to-orange-500' },
                    { icon: Shield, number: '24h', label: 'Réponse', color: 'from-green-500 to-emerald-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="backdrop-blur-2xl bg-white/70 border border-gold-light/40 rounded-2xl p-4 text-center hover:scale-105 hover:bg-white/80 transition-all cursor-pointer group shadow-xl shadow-primary/5">
                      <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl mb-2 group-hover:scale-110 transition-transform shadow-lg`}><item.icon className="text-white" size={20} /></div>
                      <div className="text-2xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">{item.number}</div>
                      <div className="text-xs text-text-gray font-semibold">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="backdrop-blur-2xl bg-white/70 border border-gold-light/40 rounded-3xl p-10 shadow-2xl shadow-primary/10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/20 to-gold-light/20 backdrop-blur-sm rounded-full mb-8 border border-gold/30">
                  <CheckCircle className="text-gold" size={18} />
                  <span className="text-sm font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Comment ça marche</span>
                </div>
                <div className="space-y-7">
                  {[
                    { icon: MapPin, title: 'Adresse', desc: "Saisissez l'adresse de votre bien", color: 'from-gold to-gold-light' },
                    { icon: Home, title: 'Caractéristiques', desc: 'Décrivez votre appartement ou maison', color: 'from-gold-light to-gold' },
                    { icon: BarChart3, title: 'Estimation', desc: 'Recevez votre fourchette de prix', color: 'from-gold to-gold' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-5 group cursor-pointer">
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                        <div className={`relative p-4 bg-gradient-to-br ${step.color} rounded-2xl shadow-2xl group-hover:scale-110 transition-transform`}><step.icon className="text-white" size={24} /></div>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">ÉTAPE {idx + 1}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold/30 via-gold-light/30 to-transparent"></div>
                        </div>
                        <div className="font-bold text-primary text-lg mb-1">{step.title}</div>
                        <div className="text-sm text-text-gray leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gold-light/40">
                  <div className="flex items-center gap-2 text-sm text-text-gray">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="font-semibold">Durée moyenne : moins de 2 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIX */}
        <section id="prix" className="py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-full mb-4 md:mb-6">
                <BarChart3 className="text-gold" size={16} />
                <span className="text-xs md:text-sm font-bold text-primary">Prix au m² Actualisés</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 md:mb-4"><span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Prix à Marseille</span></h2>
              <p className="text-sm md:text-lg text-text-gray max-w-2xl mx-auto px-2">Découvrez les prix moyens au m² pour les <span className="font-bold text-gold">111 quartiers</span> de Marseille. Données 2025.</p>
            </div>

            {/* Filtres */}
            <div className="flex flex-col gap-3 md:gap-4 max-w-5xl mx-auto mb-6 md:mb-12">
              {/* Recherche et type */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 z-10" size={18} />
                  <input type="text" placeholder="Rechercher un quartier..." value={searchQuartier} onChange={(e) => setSearchQuartier(e.target.value)} className="w-full pl-11 pr-4 py-3 md:py-4 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-xl md:rounded-2xl focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all shadow-lg text-sm md:text-base text-primary placeholder:text-text-gray" />
                </div>
                <div className="inline-flex backdrop-blur-xl bg-white/70 border border-gold-light/40 p-1 md:p-1.5 rounded-xl md:rounded-2xl shadow-lg">
                  <button onClick={() => setSelectedType('appartement')} className={`px-3 py-2 text-xs md:text-base md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold transition-all ${selectedType === 'appartement' ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'text-text-gray hover:text-primary'}`}>Appartements</button>
                  <button onClick={() => setSelectedType('maison')} className={`px-3 py-2 text-xs md:text-base md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold transition-all ${selectedType === 'maison' ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'text-text-gray hover:text-primary'}`}>Maisons</button>
                </div>
              </div>

              {/* Filtre par arrondissement */}
              <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex gap-2 min-w-max md:flex-wrap md:justify-center">
                  <button
                    onClick={() => setSelectedArrondissement('tous')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg md:rounded-xl font-medium transition-all whitespace-nowrap ${selectedArrondissement === 'tous' ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'backdrop-blur-xl bg-white/70 border border-gold-light/40 text-text-gray hover:border-gold'}`}
                  >
                    Tous ({getAllQuartiers().length})
                  </button>
                  {getArrondissements().map((arr) => (
                    <button
                      key={arr}
                      onClick={() => setSelectedArrondissement(arr)}
                      className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg md:rounded-xl font-medium transition-all whitespace-nowrap ${selectedArrondissement === arr ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'backdrop-blur-xl bg-white/70 border border-gold-light/40 text-text-gray hover:border-gold'}`}
                    >
                      {arr.substring(3)}e
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste des quartiers */}
            <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[500px] md:max-h-[600px] overflow-y-auto">
              {/* Version Mobile - Cards */}
              <div className="block md:hidden">
                {getAllQuartiers().map((q, idx) => (
                  <div key={idx} className="p-3 md:p-4 border-b border-gold-light/30 last:border-b-0 hover:bg-surface/50 transition-colors">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gold text-sm md:text-base mb-0.5 truncate">{q.nom}</div>
                        <div className="text-xs md:text-sm text-text-gray">{q.arrondissement.substring(3)}e arr.</div>
                      </div>
                      <div className="text-base md:text-lg font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent whitespace-nowrap">
                        {formatPrice(selectedType === 'appartement' ? q.prixAppart : q.prixMaison)}/m²
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Version Desktop - Table */}
              <table className="w-full hidden md:table">
                <thead className="sticky top-0 z-10"><tr className="bg-gradient-to-r from-surface via-white to-surface text-primary border-b border-gold-light/40">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Quartier</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Arrondissement</th>
                  <th className="px-6 py-4 text-right text-sm font-bold uppercase tracking-wider">Prix au m²</th>
                </tr></thead>
                <tbody className="divide-y divide-gold-light/30">
                  {getAllQuartiers().map((q, idx) => (
                    <tr key={idx} className="hover:bg-surface/50 transition-colors group">
                      <td className="px-6 py-3"><div className="font-bold text-gold group-hover:text-gold transition-colors">{q.nom}</div></td>
                      <td className="px-6 py-3"><div className="text-sm text-text-gray font-medium">{q.arrondissement.substring(3)}e</div></td>
                      <td className="px-6 py-3 text-right"><div className="text-lg font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">{formatPrice(selectedType === 'appartement' ? q.prixAppart : q.prixMaison)}/m²</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-text-gray font-medium">
              {getAllQuartiers().length} quartiers affichés • Triés par prix décroissant
            </div>
          </div>
        </section>

        {/* GUIDE */}
        <section id="guide" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4"><span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Comprendre l'estimation</span></h2>
              <p className="text-lg text-text-gray">Les facteurs clés qui déterminent le prix de votre bien</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-3xl p-8 hover:bg-white/80 transition-all group shadow-xl">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg"><TrendingUp className="text-white" size={28} /></div>
                <h3 className="text-2xl font-bold text-gold mb-4">Quartiers Premium</h3>
                <p className="text-primary mb-4">7e et 8e arrondissements : prix entre <span className="font-bold text-gold">5 000 et 6 500€/m²</span></p>
                <div className="text-sm text-text-gray font-medium">Vue mer, proximité centre, forte demande</div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-3xl p-8 hover:bg-white/80 transition-all group shadow-xl">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg"><Home className="text-white" size={28} /></div>
                <h3 className="text-2xl font-bold text-gold mb-4">Accessibles</h3>
                <p className="text-primary mb-4">3e, 14e, 15e : prix entre <span className="font-bold text-green-300">1 800 et 2 500€/m²</span></p>
                <div className="text-sm text-text-gray font-medium">Bon rapport qualité/prix, en développement</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4"><span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Questions fréquentes</span></h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "L'estimation en ligne est-elle fiable ?", a: "Oui, notre outil utilise les données réelles des transactions marseillaises. La fourchette de prix est fiable à ±10%." },
                { q: "Quels quartiers sont les plus chers ?", a: "Le Roucas-Blanc (7e), La Plage (8e), Endoume (7e) dépassent 6 000€/m²." },
                { q: "Comment la vue mer influence le prix ?", a: "Une vue mer dégagée peut ajouter 10 à 20% à la valeur." }
              ].map((faq, idx) => (
                <details key={idx} className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl hover:bg-white/80 transition-all group">
                  <summary className="px-6 py-5 cursor-pointer flex items-center justify-between font-bold text-gold">
                    <span>{faq.q}</span><ChevronRight className="text-gold group-open:rotate-90 transition-transform" size={20} />
                  </summary>
                  <div className="px-6 pb-5 text-primary leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-2xl bg-white/70 border border-gold-light/40 rounded-3xl p-12 text-center shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold rounded-3xl mb-8 shadow-2xl"><Calendar className="text-white" size={40} /></div>
              <h2 className="text-4xl md:text-5xl font-black mb-6"><span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Besoin d'un expert ?</span></h2>
              <p className="text-lg text-primary mb-10 max-w-2xl mx-auto">Échangez gratuitement avec un professionnel pour une estimation précise et des conseils personnalisés.</p>
              <a href="https://calendly.com/henzo-delbue-llinaresimmo/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-gold/30">
                <Calendar size={24} /><span>Planifier un rendez-vous gratuit</span>
              </a>
              <p className="text-sm text-text-gray mt-6 font-medium">Appel de 30 minutes • Sans engagement</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gold-light/40 backdrop-blur-xl bg-white/70 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logo.png" alt="Estimation Marseille" className="h-16 md:h-20 w-auto" />
                </div>
                <p className="text-text-gray text-sm">Service d'estimation immobilière gratuite. Données actualisées et expertise locale.</p>
              </div>
              <div>
                <h4 className="font-bold text-gold mb-3">Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#prix" className="text-text-gray hover:text-gold transition">Prix</a></li>
                  <li><a href="#guide" className="text-text-gray hover:text-gold transition">Guide</a></li>
                  <li><a href="#faq" className="text-text-gray hover:text-gold transition">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gold mb-3">Couverture</h4>
                <ul className="space-y-2 text-sm text-text-gray">
                  <li>111 quartiers de Marseille</li>
                  <li>Données 2025</li>
                  <li>Service gratuit</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gold-light/40 text-center text-sm text-text-gray">
              <p>&copy; 2025 Estimation Immobilière Marseille</p>
            </div>
          </div>
        </footer>
        
      </div>
    </div>
  );
}

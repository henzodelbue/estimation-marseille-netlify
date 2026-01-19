import React, { useState } from 'react';
import { Search, Home, MapPin, TrendingUp, CheckCircle, Calendar, Shield, Award, Users, ChevronRight, Star, Sparkles, BarChart3, Zap } from 'lucide-react';

const PRIX_QUARTIERS_SAMPLE = {
  "13007": { "Le Roucas-Blanc": { appartement: 6526, maison: 9040 }, "Endoume": { appartement: 6062, maison: 8159 }, "Bompard": { appartement: 5725, maison: 8348 } },
  "13008": { "La Plage": { appartement: 6045, maison: 9163 }, "Montredon": { appartement: 5670, maison: 7717 }, "Périer": { appartement: 4848, maison: 7362 } },
  "13003": { "Saint-Mauront": { appartement: 1805, maison: 2844 }, "Belle-de-Mai": { appartement: 2072, maison: 3485 } }
};

export default function LandingPageEstimation() {
  const [searchQuartier, setSearchQuartier] = useState('');
  const [selectedType, setSelectedType] = useState('appartement');

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

  const getAllQuartiers = () => {
    const quartiers = [];
    Object.entries(PRIX_QUARTIERS_SAMPLE).forEach(([code, quartiersList]) => {
      Object.entries(quartiersList).forEach(([nom, prix]) => {
        quartiers.push({ nom, arrondissement: code, prixAppart: prix.appartement, prixMaison: prix.maison });
      });
    });
    return quartiers.filter(q => q.nom.toLowerCase().includes(searchQuartier.toLowerCase()));
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
        <nav className="backdrop-blur-2xl bg-white/70 border-b border-gold-light/40 sticky top-0 z-50 shadow-2xl shadow-primary/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-gold via-gold to-gold-light rounded-xl shadow-lg shadow-gold/50">
                  <Home className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-gold via-gold to-gold-light bg-clip-text text-transparent">Estimation Marseille</div>
                  <div className="text-xs text-text-gray font-medium">Prix au m² 2025</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-6">
                <a href="#prix" className="hidden md:block text-primary hover:text-gold transition-all font-medium relative group">Prix<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all"></span></a>
                <a href="#guide" className="hidden md:block text-primary hover:text-gold transition-all font-medium relative group">Guide<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all"></span></a>
                <a href="#faq" className="hidden md:block text-primary hover:text-gold transition-all font-medium relative group">FAQ<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all"></span></a>
                <a href="https://calendly.com/henzo-delbue-llinaresimmo/30min" className="relative px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-gold to-gold text-white rounded-xl font-medium text-sm md:text-base overflow-hidden group shadow-lg shadow-gold/30">
                  <span className="relative z-10">Prendre RDV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </div>
            </div>
          </div>
        </nav>

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
                      <input type="text" placeholder="Adresse de votre bien à Marseille..." className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-gold-light/40 rounded-2xl focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/30 transition-all text-primary placeholder:text-text-gray font-medium" />
                    </div>
                    <button className="relative px-8 py-4 bg-gradient-to-r from-gold via-gold to-gold-light text-white rounded-2xl font-bold overflow-hidden group shadow-2xl shadow-gold/50">
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
        <section id="prix" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-full mb-6">
                <BarChart3 className="text-gold" size={18} />
                <span className="text-sm font-bold text-primary">Prix au m² Actualisés</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4"><span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Prix à Marseille</span></h2>
              <p className="text-lg text-text-gray max-w-2xl mx-auto">Découvrez les prix moyens au m² pour chaque quartier. Données 2025.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mb-12">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 z-10" size={20} />
                <input type="text" placeholder="Rechercher un quartier..." value={searchQuartier} onChange={(e) => setSearchQuartier(e.target.value)} className="w-full pl-12 pr-4 py-4 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 transition-all shadow-lg text-primary placeholder:text-text-gray" />
              </div>
              <div className="inline-flex backdrop-blur-xl bg-white/70 border border-gold-light/40 p-1.5 rounded-2xl shadow-lg">
                <button onClick={() => setSelectedType('appartement')} className={`px-4 py-2.5 text-sm md:text-base md:px-6 md:py-3 rounded-xl font-bold transition-all ${selectedType === 'appartement' ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'text-text-gray hover:text-white'}`}>Appartements</button>
                <button onClick={() => setSelectedType('maison')} className={`px-4 py-2.5 text-sm md:text-base md:px-6 md:py-3 rounded-xl font-bold transition-all ${selectedType === 'maison' ? 'bg-gradient-to-r from-gold to-gold text-white shadow-lg' : 'text-text-gray hover:text-white'}`}>Maisons</button>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-3xl overflow-hidden shadow-2xl">
              {/* Version Mobile - Cards */}
              <div className="block md:hidden">
                {getAllQuartiers().map((q, idx) => (
                  <div key={idx} className="p-4 border-b border-gold-light/30 last:border-b-0 hover:bg-surface/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="font-bold text-gold text-base mb-1">{q.nom}</div>
                        <div className="text-sm text-text-gray">{q.arrondissement.substring(3)}e arrondissement</div>
                      </div>
                      <div className="text-lg font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent whitespace-nowrap">
                        {formatPrice(selectedType === 'appartement' ? q.prixAppart : q.prixMaison)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Version Desktop - Table */}
              <table className="w-full hidden md:table">
                <thead><tr className="bg-gradient-to-r from-surface via-white to-surface text-primary border-b border-gold-light/40">
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Quartier</th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Arrondissement</th>
                  <th className="px-6 py-5 text-right text-sm font-bold uppercase tracking-wider">Prix au m²</th>
                </tr></thead>
                <tbody className="divide-y divide-gold-light/30">
                  {getAllQuartiers().map((q, idx) => (
                    <tr key={idx} className="hover:bg-surface/50 transition-colors group">
                      <td className="px-6 py-4"><div className="font-bold text-gold group-hover:text-gold transition-colors">{q.nom}</div></td>
                      <td className="px-6 py-4"><div className="text-sm text-text-gray font-medium">{q.arrondissement.substring(3)}e</div></td>
                      <td className="px-6 py-4 text-right"><div className="text-xl font-black bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">{formatPrice(selectedType === 'appartement' ? q.prixAppart : q.prixMaison)}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center text-sm text-text-gray font-medium">Tous les quartiers de Marseille référencés</div>
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
                  <div className="p-2 bg-gradient-to-br from-gold to-gold rounded-xl shadow-lg"><Home className="text-white" size={24} /></div>
                  <span className="text-xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Estimation Marseille</span>
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

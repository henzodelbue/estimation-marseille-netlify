import React from 'react';
import Navigation from '../components/Navigation';
import { Award, Shield, Users, MapPin, Phone, Mail, CheckCircle, Building, TrendingUp, Star } from 'lucide-react';

export default function QuiSommesNousPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-surface to-white">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-light/20 via-white to-surface"></div>
        <div className="absolute top-0 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[900px] h-[900px] bg-gradient-to-tr from-gold-light/15 via-gold/20 to-gold-light/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        .animate-blob { animation: blob 20s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>

      <div className="relative z-10 pt-24 md:pt-28">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-8 md:pt-12 pb-8 md:pb-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-full mb-4 md:mb-6">
              <Award className="text-gold" size={16} />
              <span className="text-xs md:text-sm font-bold text-primary">Agent Immobilier Professionnel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Votre expert</span>
              <br />
              <span className="bg-gradient-to-r from-gold via-gold to-gold-light bg-clip-text text-transparent">immobilier à Marseille</span>
            </h1>
            <p className="text-base md:text-lg text-text-gray max-w-2xl mx-auto px-2">
              Conseiller immobilier chez Llinares Immobilier, je vous accompagne dans tous vos projets immobiliers avec sérieux et professionnalisme.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Photo */}
              <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
                <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden mb-6 border-4 border-gold/30 shadow-xl">
                  <img
                    src="/henzo-delbue.jpg"
                    alt="Henzo DEL BUE - Agent Immobilier"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Henzo DEL BUE</h2>
                <p className="text-gold font-medium mb-4">Conseiller Immobilier</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full">
                  <Building className="text-gold" size={18} />
                  <span className="text-sm font-medium text-primary">Llinares Immobilier</span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4 md:space-y-6">
                <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl p-4 md:p-6 hover:bg-white/80 transition-all">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gold/10 rounded-xl flex-shrink-0">
                      <Shield className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">Expertise locale</h3>
                      <p className="text-sm md:text-base text-text-gray">Une connaissance approfondie du marché immobilier marseillais et de ses 111 quartiers.</p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl p-4 md:p-6 hover:bg-white/80 transition-all">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gold/10 rounded-xl flex-shrink-0">
                      <TrendingUp className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">Accompagnement personnalisé</h3>
                      <p className="text-sm md:text-base text-text-gray">Un suivi sur-mesure de votre projet, de l'estimation à la signature.</p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl p-4 md:p-6 hover:bg-white/80 transition-all">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gold/10 rounded-xl flex-shrink-0">
                      <Star className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">Professionnalisme</h3>
                      <p className="text-sm md:text-base text-text-gray">Un engagement total pour la réussite de votre transaction immobilière.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Mes services</span>
              </h2>
              <p className="text-sm md:text-base text-text-gray">Un accompagnement complet pour vos projets immobiliers</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Estimation gratuite', desc: 'Une évaluation précise de votre bien basée sur les données du marché local' },
                { title: 'Vente immobilière', desc: 'Mise en valeur et commercialisation de votre bien pour une vente rapide' },
                { title: 'Achat immobilier', desc: 'Recherche et sélection de biens correspondant à vos critères' },
                { title: 'Conseil personnalisé', desc: 'Des recommandations adaptées à votre situation et vos objectifs' },
                { title: 'Négociation', desc: 'Défense de vos intérêts pour obtenir les meilleures conditions' },
                { title: 'Suivi administratif', desc: 'Accompagnement jusqu\'à la signature chez le notaire' }
              ].map((service, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-2xl p-4 md:p-6 hover:bg-white/80 hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <CheckCircle className="text-gold flex-shrink-0" size={18} />
                    <h3 className="font-bold text-primary text-sm md:text-base">{service.title}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-text-gray">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Contactez-moi</span>
              </h2>
              <p className="text-sm md:text-base text-text-gray mb-6 md:mb-8">Discutons de votre projet immobilier</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <a href="tel:+33782402998" className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-xl hover:bg-gold/10 transition-all">
                  <Phone className="text-gold" size={18} />
                  <span className="font-medium text-primary text-sm md:text-base">07 82 40 29 98</span>
                </a>
                <a href="mailto:henzodelbue@gmail.com" className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-xl hover:bg-gold/10 transition-all">
                  <Mail className="text-gold" size={18} />
                  <span className="font-medium text-primary text-sm md:text-base">henzodelbue@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-text-gray mb-6 md:mb-8">
                <MapPin className="text-gold" size={16} />
                <span className="text-sm md:text-base">Marseille et alentours</span>
              </div>

              <a
                href="https://calendly.com/henzo-delbue-llinaresimmo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold text-sm md:text-base hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-gold/30"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gold-light/40 backdrop-blur-xl bg-white/70 py-6 md:py-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <img src="/logo.png" alt="Estimation Marseille" className="h-14 md:h-16 w-auto mx-auto mb-3" />
            <p className="text-xs md:text-sm text-text-gray">&copy; 2025 Henzo DEL BUE • Llinares Immobilier</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

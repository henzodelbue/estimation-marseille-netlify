import React from 'react';
import Navigation from '../components/Navigation';
import { CheckCircle, Calendar, Phone, Mail, Home, ArrowLeft, Clock, MapPin } from 'lucide-react';

export default function ConfirmationPage() {
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
        @keyframes checkmark { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
        .animate-checkmark { animation: checkmark 0.6s ease-out forwards; }
      `}</style>

      <div className="relative z-10 pt-24 md:pt-28">

        {/* NAV */}
        <Navigation />

        {/* CONFIRMATION CONTENT */}
        <section className="pt-8 pb-24 px-6">
          <div className="max-w-2xl mx-auto">

            {/* Success Card */}
            <div className="backdrop-blur-2xl bg-white/80 border border-gold-light/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10 text-center">

              {/* Checkmark Animation */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl shadow-green-500/30 animate-checkmark">
                  <CheckCircle className="text-white" size={48} />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">Rendez-vous confirmé !</span>
              </h1>

              <p className="text-lg text-text-gray mb-8">
                Merci pour votre confiance. Votre rendez-vous a bien été enregistré.
              </p>

              {/* Info Box */}
              <div className="backdrop-blur-xl bg-surface/50 border border-gold-light/30 rounded-2xl p-6 mb-8 text-left">
                <h2 className="font-bold text-gold mb-4 flex items-center gap-2">
                  <Calendar className="text-gold" size={20} />
                  Détails du rendez-vous
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary">
                    <Clock className="text-gold/60" size={18} />
                    <span>Durée : 30 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <Phone className="text-gold/60" size={18} />
                    <span>Appel téléphonique</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <MapPin className="text-gold/60" size={18} />
                    <span>Estimation immobilière à Marseille</span>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="backdrop-blur-xl bg-gold/5 border border-gold/20 rounded-2xl p-6 mb-8 text-left">
                <h2 className="font-bold text-gold mb-4">Prochaines étapes</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span className="text-primary">Un email de confirmation vous a été envoyé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span className="text-primary">Préparez les informations sur votre bien (surface, étage, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span className="text-primary">Je vous appellerai à l'heure convenue</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gold-light/30">
                <p className="text-sm text-text-gray mb-4">Une question ? Contactez-moi directement :</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:+33782402998" className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-xl hover:bg-gold/10 transition-all">
                    <Phone className="text-gold" size={18} />
                    <span className="font-medium text-primary">07 82 40 29 98</span>
                  </a>
                  <a href="mailto:henzodelbue@gmail.com" className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/70 border border-gold-light/40 rounded-xl hover:bg-gold/10 transition-all">
                    <Mail className="text-gold" size={18} />
                    <span className="font-medium text-primary">henzodelbue@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8">
                <a href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-gold text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl shadow-gold/30">
                  <Home size={20} />
                  <span>Retour à l'accueil</span>
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gold-light/40 backdrop-blur-xl bg-white/70 py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-text-gray">&copy; 2025 Estimation Immobilière Marseille • Henzo DEL BUE</p>
          </div>
        </footer>

      </div>
    </div>
  );
}

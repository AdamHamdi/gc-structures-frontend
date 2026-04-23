"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendContact } from "@/lib/api";


export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 flex-center max-width-1518-px mx-auto">
      <div className="flex flex-wrap justify-between items-start px-4">
        {/* Colonne gauche - Image */}
        <div className="col-gt-sm-30 col-sm-100 col-xs-100 mb-5 px-4 hidden lg:block">
          <p className="fz-28 poppinsbold line-height-42">
            Nous sommes prêts à vous aider à tout moment
          </p>
          <p className="fz-15 mt-4 clr-4 line-height-28">
            Notre équipe est toujours là pour vous guider et concrétiser votre projet.
          </p>
          <Image
            loading="eager"
            src="/images/contact-gc-structures.webp"
            alt="GC Structures"
            className="w-95-perc mt-4"
            width={400}
            height={400}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Colonne centrale - Formulaire */}
        <div className="col-gt-sm-45 col-sm-100 col-xs-100 px-3 mb-4">
          <div className="bg-1 w-100-perc rounded-25 p-5 lg:p-6">
            <p className="fz-24 lg:fz-28 poppinsbold line-height-36">
              Parlez-nous de votre projet
            </p>

            {success && (
              <div className="bg-green-100 text-green-800 rounded-lg p-3 mb-4 fz-14">
                Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-800 rounded-lg p-3 mb-4 fz-14">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 form">
              <div className="w-100-perc mb-2">
                <label htmlFor="name" className="fz-14 lg:fz-15">Nom *</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="phone" className="fz-14 lg:fz-15">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="email" className="fz-14 lg:fz-15">Email *</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="message" className="fz-14 lg:fz-15">Message *</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="flex-center">
                <button
                  type="submit"
                  className="bg-2 btn clr-1"
                  disabled={loading}
                >
                  {loading ? 'Envoi...' : 'Envoyer'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Colonne droite - Coordonnées */}
        <div className="col-gt-sm-25 col-sm-100 col-xs-100 px-3 mb-4">
          <div className="bg-2 w-100-perc rounded-25 p-5">
            <div className="mb-5">
              <p className="fz-20 poppins-semibold clr-1 mb-3">Téléphone</p>
              <Link href="tel:0172584088" className="flex items-center">
                <svg width="24" height="24" fill="#fff" className="mr-3">
                  <use href="/icons/icons.svg#icon-phone"></use>
                </svg>
                <span className="fz-17 clr-1">01 72 58 40 88</span>
              </Link>
            </div>
            <div className="mb-5">
              <p className="fz-20 poppins-semibold clr-1 mb-3">Email</p>
              <Link href="mailto:contact@gc-structures.fr" className="flex items-center">
                <i className="pi pi-envelope clr-1 fz-20 mr-3"></i>
                <span className="fz-17 clr-1">contact@gc-structures.fr</span>
              </Link>
            </div>
            <div>
              <p className="fz-20 poppins-semibold clr-1 mb-3">Adresse</p>
              <div className="flex items-start">
                <i className="pi pi-map-marker clr-1 fz-20 mr-3 mt-1"></i>
                <span className="fz-17 clr-1">3 Sente Margot, 95800 Cergy, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

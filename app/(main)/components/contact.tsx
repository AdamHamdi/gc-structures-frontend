"use client";

import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";  

interface MessageResponse {
  message: string;
  customer_id: string;
  upload_url?: string;
  s3_key?: string;
  content_type?: string;
}

export default function Contact() {
 

  return (
    <div className="py-8 flex-center max-width-1518-px mx-auto">
      <div className=" flex flex-wrap justify-between items-start px-4">
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
          />
        </div>

        {/* Colonne centrale - Formulaire */}
        <div className="col-gt-sm-45 col-sm-100 col-xs-100 px-3 mb-4">
          <div className="bg-1 w-100-perc rounded-25 p-5 lg:p-6">
            <p className="fz-24 lg:fz-28 poppinsbold line-height-36">
              Parlez-nous de votre projet
            </p> 
           

             

            <form   className="mt-4 form">
              <div className="w-100-perc mb-2">
                <label htmlFor="name" className="fz-14 lg:fz-15">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  
                  required
                  
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="phone" className="fz-14 lg:fz-15">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  
                  
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="email" className="fz-14 lg:fz-15">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                
                  required
                  
                />
              </div>
              <div className="w-100-perc mb-2">
                <label htmlFor="message" className="fz-14 lg:fz-15">
                  Message *
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={4}
            
                  required
                  
                ></textarea>
              </div>

              {/* Section pièce jointe */}
              <div className="w-100-perc mb-3">
                <div className="flex items-center relative">
                 
                  <span className="fz-14 clr-4 underline cursor-pointer">
                    
                  </span>
                  <input
                     
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    
                  />
                  
                    <button
                      type="button"
                     
                      className="ml-3 text-red-500 hover:text-red-700 fz-12"
                      
                    >
                      Supprimer
                    </button>
               
                </div>
                <p className="fz-12 text-gray-500 mt-1">
                  PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (max 100 Mo)
                </p>
              </div>

              {/* Progress indicator */}
            
             

              <div className="flex-center">
                <button
                  type="submit"
                  className="bg-2 btn clr-1"
                  
                >Envoyer
                  
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
              <Link href="tel:12365125124" className="flex items-center">
                <svg width="24" height="24" fill="#fff" className="mr-3">
                  <use href="/icons/icons.svg#icon-phone"></use>
                </svg>
                <span className="fz-17 clr-1">12 365 125 124</span>
              </Link>
            </div>
            <div className="mb-5">
              <p className="fz-20 poppins-semibold clr-1 mb-3">Email</p>
              <Link href="mailto:contact@gc-structures.com" className="flex items-center">
                <i className="pi pi-envelope clr-1 fz-20 mr-3"></i>
                <span className="fz-17 clr-1">contact@gc-structures.com</span>
              </Link>
            </div>
            <div>
              <p className="fz-20 poppins-semibold clr-1 mb-3">Adresse</p>
              <div className="flex items-start">
                <i className="pi pi-map-marker clr-1 fz-20 mr-3 mt-1"></i>
                <span className="fz-17 clr-1">123 Rue Example, 75000 Paris, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

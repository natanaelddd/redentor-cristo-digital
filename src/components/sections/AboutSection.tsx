
import React from "react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
    return (
        <section id="sobre" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {siteContent.about_us_image && <img src={siteContent.about_us_image} alt="Pastor pregando na Igreja Missionária Cristo Redentor" className="rounded-lg shadow-lg w-full h-auto object-cover aspect-square" />}
              </div>
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">{siteContent.about_us_heading || ''}</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  {siteContent.about_us_p1 || ''}
                </p>
                <p className="text-muted-foreground text-lg">
                  {siteContent.about_us_p2 || ''}
                </p>
              </div>
            </div>
          </div>
        </section>
    );
};

import type { Metadata } from "next";
import { CvLayout } from "@/components/cv/cv-layout";
import { CvHero } from "@/components/cv/cv-hero";
import { CvExecutiveSummary } from "@/components/cv/cv-executive-summary";
import { CvProfessionalArchitecture } from "@/components/cv/cv-professional-architecture";
import { CvCoreCapabilities } from "@/components/cv/cv-core-capabilities";
import { CvTechnicalSkills } from "@/components/cv/cv-technical-skills";
import { CvEducation } from "@/components/cv/cv-education";
import { CvCertifications } from "@/components/cv/cv-certifications";
import { CvEngineeringExperience } from "@/components/cv/cv-engineering-experience";
import { CvFlagshipProjects } from "@/components/cv/cv-flagship-projects";
import { CvSupportingProjects } from "@/components/cv/cv-supporting-projects";
import { CvResearch } from "@/components/cv/cv-research";
import { CvAchievements } from "@/components/cv/cv-achievements";
import { CvProfessionalDirection } from "@/components/cv/cv-professional-direction";
import { CvContactDownload } from "@/components/cv/cv-contact-download";

export const metadata: Metadata = {
  title: "CV — Bukya Naresh — Quantitative Developer — CN2.DEV",
  description:
    "Print-ready CV — Bukya Naresh / CN2.DEV. Quantitative engines, market-data infrastructure, research governance and performance systems. Complete engineering dossier with all 14 chapters.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <CvLayout>
      <div className="relative">
        {/* 01 Hero */}
        <CvHero />

        {/* 02 Executive Summary */}
        <CvExecutiveSummary />

        {/* 03 Professional Architecture */}
        <CvProfessionalArchitecture />

        {/* 04 Core Capabilities */}
        <CvCoreCapabilities />

        {/* 05 Technical Skills */}
        <CvTechnicalSkills />

        {/* 06 Education */}
        <CvEducation />

        {/* 07 Certifications */}
        <CvCertifications />

        {/* 08 Engineering Experience */}
        <CvEngineeringExperience />

        {/* 09 Flagship Projects */}
        <CvFlagshipProjects />

        {/* 10 Supporting Projects */}
        <CvSupportingProjects />

        {/* 11 Research */}
        <CvResearch />

        {/* 12 Achievements */}
        <CvAchievements />

        {/* 13 Professional Direction */}
        <CvProfessionalDirection />

        {/* 14 Contact & Download */}
        <CvContactDownload />
      </div>

      {/* Print-only overlay */}
      <div className="hidden print:block fixed inset-0 z-50 bg-white p-8 text-black">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl font-bold mb-4">CN2.DEV — Engineering Dossier</h1>
          <p className="text-sm text-gray-600 mb-6">
            Bukya Naresh — Quantitative Developer. Complete professional CV with all chapters.
          </p>
          <p className="text-xs text-gray-500">
            Print this page or use "Save as PDF" to download the complete CV.
          </p>
        </div>
      </div>
    </CvLayout>
  );
}
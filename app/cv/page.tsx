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
import { CvDownload } from "@/components/cv/cv-download";
import "./cv.css";

export const metadata: Metadata = {
  title: "CV — Bukya Naresh — Quantitative Developer — CN2.DEV",
  description:
    "Bukya Naresh — Quantitative Developer. Fourteen-chapter interactive CV covering systems engineering, quantitative development, data infrastructure, research and verified evidence.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <CvLayout>
      <div className="relative">
        {/* Visual introduction */}
        <CvHero />

        {/* 01 Summary */}
        <CvExecutiveSummary />

        {/* 02 Technical Skills */}
        <CvCoreCapabilities />

        {/* 03 Technology Stack */}
        <CvTechnicalSkills />

        {/* 04 Education */}
        <CvEducation />

        {/* 05 Certifications */}
        <CvCertifications />

        {/* 06 Experience */}
        <CvEngineeringExperience />

        {/* 07 Featured Projects */}
        <CvFlagshipProjects />

        {/* 08 Projects */}
        <CvSupportingProjects />

        {/* 09 Research */}
        <CvResearch />

        {/* 10 Achievements */}
        <CvAchievements />

        {/* 11 Contributions */}
        <CvProfessionalArchitecture />

        {/* 12 Interests */}
        <CvProfessionalDirection />

        {/* 13 Contact */}
        <CvContactDownload />

        {/* 14 Download CV */}
        <CvDownload />
      </div>

    </CvLayout>
  );
}
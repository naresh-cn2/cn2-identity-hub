import BuildsVisual from "./visuals/work-visual";
import CredentialsVisual from "./visuals/credentials-visual";
import ServicesVisual from "./visuals/services-visual";
import LabVisual from "./visuals/lab-visual";
import ResearchVisual from "./visuals/research-visual";
import OpportunitiesVisual from "./visuals/opportunities-visual";
import AboutVisual from "./visuals/about-visual";
import ConnectVisual from "./visuals/connect-visual";

/**
 * DestinationVisual - routes a journey position (destination code) to that
 * destination's scene, so each scene travels with its destination.
 *
 * One shared frame (canvas ambience under crisp SVG structure), eight
 * distinct compositions. Each visual evolves independently in its own file.
 *
 * The mapping is positional and follows the IA v5 journey order:
 * 01 Builds · 02 Laboratory · 03 Research & Journal · 04 Services ·
 * 05 Education & Credentials · 06 Careers & Collaboration · 07 About ·
 * 08 Contact. A scene travels with its destination, so reordering the
 * journey means reordering this switch — never the scenes themselves.
 */
export default function DestinationVisual({ code }: { code: string }) {
  switch (code) {
    case "01":
      return <BuildsVisual />;
    case "02":
      return <LabVisual />;
    case "03":
      return <ResearchVisual />;
    case "04":
      return <ServicesVisual />;
    case "05":
      return <CredentialsVisual />;
    case "06":
      return <OpportunitiesVisual />;
    case "07":
      return <AboutVisual />;
    case "08":
      return <ConnectVisual />;
    default:
      return null;
  }
}

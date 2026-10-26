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
 */
export default function DestinationVisual({ code }: { code: string }) {
  switch (code) {
    case "01":
      return <BuildsVisual />;
    case "02":
      return <ResearchVisual />;
    case "03":
      return <LabVisual />;
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

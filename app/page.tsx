"use server";

export const dynamic = "force-dynamic";

import HomepageClient from "@/clients/client";
import LandingPage from "@/models/LandingPage";
import SystemParameter from "@/models/SystemParameter";
import LandingPageType from "@/models/types/landing-page-types";

export default async function Home() {
  const param = await SystemParameter.findOne({
    where: { name: "LP_VER" },
  });

  if (!param) {
    return <div>Parameter not found</div>;
  }

  const version = param.value;

  const landingPage = await LandingPage.findOne({
    where: { version },
  });

  if (!landingPage) {
    return <div>Landing page not found for version {version}</div>;
  }

  const landingPageData: LandingPageType = landingPage.toJSON();

  return (
    <HomepageClient
      description={landingPageData.description}
      social_linkedin={landingPageData.social_linkedin}
      social_medium={landingPageData.social_medium}
      social_email={landingPageData.social_email}
    />
  );
}

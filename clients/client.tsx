"use client";

import Header from "@/components/header";

export default function HomepageClient({
  description,
  social_linkedin,
  social_medium,
  social_email,
}: {
  description: string;
  social_linkedin: string;
  social_medium: string;
  social_email: string;
}) {
  return (
    <>
      <Header
        social_linkedin={social_linkedin}
        social_medium={social_medium}
        social_email={social_email}
      />
    </>
  );
}

import React, { FunctionComponent } from "react";

type WelcomeProps = {
  title: string;
  paragraph: string;
};

export const WelcomeCard: FunctionComponent<WelcomeProps> = ({
  title,
  paragraph,
}: WelcomeProps) => (
  <div>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </div>
);

export default WelcomeCard;

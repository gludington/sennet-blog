import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "../../components/Bounded";

const Image = ({ slice }) => {
  const image = slice.primary.image;
  console.warn
  return (
    <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
      <figure className={`grid grid-cols-1 gap-4 ml-2${slice.primary.figureClassName ? ` ${slice.primary.figureClassName}` : ''}`}>
        {prismicH.isFilled.image(image) && (
          <div className="">
            <PrismicNextImage field={image} />
          </div>
        )}
        {prismicH.isFilled.richText(slice.primary.caption) && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
            {slice.primary.caption?.[0]?.text ? <span className="text-sm md:text">{slice.primary.caption[0].text}</span> : null}
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
};

export default Image;

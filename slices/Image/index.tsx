import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "../../components/Bounded";

const Figure = ({ slice, image }) => {
  return (
    <figure className={`grid grid-cols-1 gap-4${slice.primary.figureClassName ? ` ${slice.primary.figureClassName}` : ''}`}>
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
  )
}

const Image = ({ slice }) => {
  const image = slice.primary.image;
  if (slice.variation === "inarticle") {
    return <Figure slice={slice} image={image}/>
  }
      
  return (
    <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
      <Figure slice={slice} image={image}/>
    </Bounded>
  );
};

export default Image;

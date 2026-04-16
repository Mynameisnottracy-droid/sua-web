import { client } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Nyheter
export async function getNyheter(limit?: number) {
  const limitClause = limit ? `[0...${limit}]` : "";
  return client.fetch(
    `*[_type == "nyhet"] | order(publiceringsdatum desc) ${limitClause} {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      publiceringsdatum,
      kategori
    }`
  );
}

export async function getNyhet(slug: string) {
  return client.fetch(
    `*[_type == "nyhet" && slug.current == $slug][0] {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      publiceringsdatum,
      kategori,
      brodtext,
      citat,
      citatKalla,
      faktaruta
    }`,
    { slug }
  );
}

// Events
export async function getEvents(limit?: number) {
  const limitClause = limit ? `[0...${limit}]` : "";
  return client.fetch(
    `*[_type == "event"] | order(eventdatum asc) ${limitClause} {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      eventdatum,
      eventslut,
      plats,
      kategori
    }`
  );
}

export async function getEvent(slug: string) {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      eventdatum,
      eventslut,
      plats,
      kategori,
      brodtext,
      anmalanlank,
      citat,
      faktaruta
    }`,
    { slug }
  );
}

// Utbildningar
export async function getUtbildningar(limit?: number) {
  const limitClause = limit ? `[0...${limit}]` : "";
  return client.fetch(
    `*[_type == "utbildning"] | order(_createdAt desc) ${limitClause} {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      larosate,
      nivaPoang,
      amnesomrade
    }`
  );
}

export async function getUtbildning(slug: string) {
  return client.fetch(
    `*[_type == "utbildning" && slug.current == $slug][0] {
      _id,
      rubrik,
      slug,
      bild,
      ingress,
      larosate,
      nivaPoang,
      amnesomrade,
      brodtext,
      citat,
      citatKalla,
      faktaruta,
      ansokanslank
    }`,
    { slug }
  );
}

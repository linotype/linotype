interface Parent {
  id: number;
  title: string;
  slug: string;
  parent?: Parent | null;
}

export function getAncestorsList(data: Parent): Parent[] {
  const result: Parent[] = [];
  if (data) {
    result.push({ id: data.id, title: data.title, slug: data.slug });
    if (data.parent ) {
      const parentResult: Parent[] = getAncestorsList(data.parent as Parent);
      result.push(...parentResult)
    }
  }
  return result;
}
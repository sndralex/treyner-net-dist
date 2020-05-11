export function resolveContentLink(link, language) {
  let resultLink;
  switch (link.type) {
  case 'resume':
    resultLink = `/resumes/${link.itemId}`;
    break;
  case 'portal':
    resultLink = `/portals/${link.urlSlug}`;
    break;
  case 'brewer':
    resultLink = `/brewers/${link.urlSlug}`; 
    break;
  default:
    resultLink = '';
  }
  if(language){
    resultLink = `/${language}${resultLink}`
  }

  return resultLink;
}
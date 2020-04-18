//import * as ArticleStore from '../Stores/Article';
//import * as BrewerStore from '../Stores/Brewer';
//import * as CafeStore from '../Stores/Cafe';
//import * as CoffeeStore from '../Stores/Coffee';
//import * as FactStore from '../Stores/Fact';
import * as HomeStore from '../Stores/Home';
/*
const allStores = [
  ArticleStore,
  BrewerStore,
  CafeStore,
  CoffeeStore,
  FactStore
];
*/
const allStores =[
  HomeStore
];
const resetStores = () => allStores.forEach(store => store.resetStore());

export {
  resetStores
}
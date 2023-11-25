import Story from "../components/Story.js";
import view from "../utils/view.js";


export default async function Stories(path) {
  const stories = await getStories(path);
  const hasStories = stories.length > 0;
  

  view.innerHTML = `<div>
    ${hasStories ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories'}
  </div>`;  
}

async function getStories(path) {
  const isHomeRoute = path === "/";
  const isNewRoute = path === "/new";
  const isAskRoute = path === "/ask";
  const isShowRoute = path === "/show";

  if (isHomeRoute) {
    path = "/news";
  } else if (isNewRoute) {
    path = "/new";
  } else if (isAskRoute) {
    path = "/ask";
  } else if (isShowRoute) {
    path = "/show";
  }

  const response = await fetch(`https://node-hnapi.herokuapp.com${path}`);
  const stories = await response.json();
  return stories;
}

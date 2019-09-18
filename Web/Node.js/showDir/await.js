async function showStory(storyUrl){
  var story = await getJSON(storyUrl)
  let chapterPromises = story.chapters.map(getJSON)
  for(let chapterPromise of chapterPromises){
    var chapter = await chapterPromise
    addToPage(chapter)
  }
}
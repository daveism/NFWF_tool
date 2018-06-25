/**
 * update the display of element
 *  @param { Object } element - Element object from click event, used to toggle
 *                   display state
 */
export function toggleElementDisplay(thisEle, elements) {
  /**
   * TODO: Replace map with forEach or equivalent function. The purpose of map
   * is to iterate over each element in an array to create a new array. This is
   * only iterating over each element in an array.
   */
  elements.map((ele) => {
    const name = ele.replace('main_nav_', '');
    const tabEle = document.querySelector(`[ref="tab-${name}"]`);
    const mapClass = tabEle.className;
    const newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';
    console.log(name, newMapClass);

    tabEle.className = newMapClass;
  });

  // let element = document.querySelector(`[ref="tab-${elementName}"]`);
  // console.log(`[ref="tab_${elementName}"]`)
  // const mapClass = thisEle.componentElem.className;
  // console.log(thisEle)
  // if(mapClass.indexOf(' d-none') > 0){
  //   console.log('here')
  //   element.className = mapClass.replace(' d-none','');
  // } else {
  //   console.log('not here')
  //
  //   element.className = mapClass + ' d-none';
  // }

  // return element
}

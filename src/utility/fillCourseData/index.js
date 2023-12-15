export const fillCourseData = (array) => {
  let name = [];
  array.map((item) => {
    name = [
      ...name,
      {
        value: item.id || item.teacherId,
        label:
          item.typeName ||
          item.termName ||
          item.fullName ||
          item.levelName ||
          item.classRoomName ||
          item.techName,
      },
    ];
  });
  console.log("name", name);
  return name;
};

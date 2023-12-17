// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import setDeletedTeacherCourses from "./setDeletedTeacherCourses";
import setActiveTeacherCourses from "./setActiveTeacherCourses";
import setActiveCourses from "./setActiveCourses";
import setDeletedCourses from "./setDeletedCourses";
const rootReducer = {
  navbar,
  layout,
  setActiveTeacherCourses,
  setDeletedTeacherCourses,
  setActiveCourses,
  setDeletedCourses,
};
export default rootReducer;

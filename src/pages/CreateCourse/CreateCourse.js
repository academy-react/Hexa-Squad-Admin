import BreadCrumbs from "../../@core/components/breadcrumbs";
import CreateCourse from "../../@core/components/createCourseWizard";
const CreateCoursePage = () => {
  return (
    <CreateCourse type={"modern-horizontal"}>
      <BreadCrumbs
        title={"اضافه کردن دوره"}
        data={[
          { title: "دوره ها", link: "/Courses" },
          { title: "اضافه کردن دوره", link: "/Course/create" },
        ]}
      />
    </CreateCourse>
  );
};

export default CreateCoursePage;

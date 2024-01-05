import WeekMaterial from "../../../components/user/ClassMaterial/WeekMaterial";

import './ClassMaterialPage.scss'


function ClassMaterialPage() {
  const WFiles = ['Helloworld.pdf', 'Hi.pdf']
  const Sections =
    [
      {
        SectionTitle: 1,
        WFile: WFiles,
      },
      {
        SectionTitle: 2,
        WFile: WFiles,
      },
      {
        SectionTitle: 3,
        WFile: WFiles,
      },
    ];
  return (
    <>
      <div className="MainScreenClassMaterial">
        <WeekMaterial Sections={Sections} />
      </div>
    </>
  );


}

export default ClassMaterialPage;

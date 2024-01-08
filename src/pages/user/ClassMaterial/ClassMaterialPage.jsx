import WeekMaterial from "../../../components/user/ClassMaterial/WeekMaterial";

import './ClassMaterialPage.scss'


function ClassMaterialPage() {
  const Sections =
    [
      {
        title: 'Week 1',
        content: '<p>Week 1 content</p>',
        documentUrls: {
          'Helloworld.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          'Hi.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
      },
      {
        title: 'Week 1',
        content: '<p>Week 1 content</p>',
        documentUrls: {
          'Helloworld.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          'Hi.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
      },
      {
        title: 'Week 1',
        content: '<p>Week 1 content</p>',
        documentUrls: {
          'Helloworld.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          'Hi.pdf': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
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

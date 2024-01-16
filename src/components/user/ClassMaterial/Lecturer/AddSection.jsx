import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './AddSection.scss'
function AddSection(props) {

    let onChange = props.onChange || (() => { });

    return (
        <div className='CKContainer'>
            <CKEditor
                height='50vh'
                editor={ClassicEditor}
                data={props.data}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    )
}
export default AddSection;
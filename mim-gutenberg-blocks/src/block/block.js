/**
 * BLOCK: mim-title-lead
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, getAutosave } = wp.editor; 

const categoriesSelections = [];

const allCategories = wp.apiFetch({path: "/wp/v2/categories"}).then(categories => {
	$.each( categories, function( key, val ) {
		categoriesSelections.push({id: val.id, name: val.name});
	});
	return categoriesSelections;
});


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-mim-title-lead', {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'mim-title-lead - CGB Block' ), // Block title. 
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'mim-title-lead — CGB Block' ),
		__( 'title' ),
		__( 'lead' )
	],
	attributes: { 
		title: {
			type: 'string'
		},
		txt: {
			type: 'string'
		 },
		catName: {
			type: 'array'
		},
		copyright: {
			type: 'string'
		}
	 },
	 options: categoriesSelections,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {  
		const {attributes: {title, txt, copyright }, setAttributes} = props;
		const x = wp.data.select("core/editor").getEditedPostAttribute("categories");

		function onChangeTxt(newValue) {
			let catArr = [];
			for(let i = 0; i<x.length; i++){
				categoriesSelections.forEach((el)=>{
						if(el.id === x[i]){
							catArr.push(el.name);
						}
						return catArr;
				});
			}
			setAttributes({txt: newValue, catName: catArr});
		   }
		function onChangeTitle(newValue) {
			let catArr = [];
			for(let i = 0; i<x.length; i++){
				categoriesSelections.forEach((el)=>{
					if(el.id === x[i]){
						catArr.push(el.name);
					}
					return catArr;
				});
			}
			setAttributes({title: newValue, catName: catArr});
		}
		function onChangeCR(newValue) {
			let catArr = [];
			for(let i = 0; i<x.length; i++){
				categoriesSelections.forEach((el)=>{
					if(el.id === x[i]){
						catArr.push(el.name);
					}
					return catArr;
				});
			}
			setAttributes({copyright: newValue, catName: catArr});
		}

        return (
			<div class="content title-lead">
				<div class="grid-container title-lead__container">
					<div class="title-lead__categories-wrapper">
						{wp.data.select("core/editor").getEditedPostAttribute("categories").map((item)=>{
							return <p class="title-lead__categories">{item}</p>
						})}
						<RichText className="title-lead__copyright" tagName='p' placeholder={__( 'copyright' )} value={copyright} onChange={onChangeCR} />
					</div>
					<div class="title-lead__wrapper">
						<RichText className="title-lead__title" tagName='h1' placeholder={__('Title')} value={title} onChange={onChangeTitle}/>
						<RichText className="title-lead__lead" tagName='p' placeholder={__( 'Leadtext' )} value={txt} onChange={onChangeTxt} />
					</div>
				</div>
			</div>
		);
    },
    save: ( props ) => {
		const {
		   attributes: {
			  title,
			  txt,
			  copyright,
			  catName
		   }
		} = props;
		return (
			<div class="content title-lead">
				<div class="grid-container title-lead__container">
					<div class="title-lead__categories-wrapper">
						{ catName ? catName.map((item)=>{
							return <p class="title-lead__categories">{item}</p>
						}) : null}
						<RichText.Content className="title-lead__copyright" tagName='p' placeholder={__('copyright')} value={copyright} />
					</div>
					<div class="title-lead__wrapper"> 
						<RichText.Content className="title-lead__title" tagName='h1' placeholder={__('Title')} value={title} />
						<RichText.Content className="title-lead__lead" tagName='p' placeholder={__( 'LeadText' )} value={txt} />
					</div>
				</div>
			</div> 
		);
	 },
} );

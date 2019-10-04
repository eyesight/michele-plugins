/**
 * BLOCK: mim-test
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, MediaUpload } = wp.editor; 
const { PanelBody, PanelRow, FormToggle } = wp.components; 

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
registerBlockType( 'cgb/block-mim-img-title', { 
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'mim-img-title - CGB Block' ), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'mim-img-title — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ), 
	],
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/300x200'
		},
	
		heading: { 
			type: 'string'
		}
	},

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
		const { attributes: { imgUrl, heading }, setAttributes } = props;


		function selectImage(value) {
			console.log(value);
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}
	
		function changeHeading(heading) {
			// using some nice js features instead of typing
			setAttributes({ heading: heading });
		}
	
		return [
			<div class="content title-image">
				<div class="grid-container title-image__container">
					<div class="title-image__image">
						<MediaUpload 
							onSelect={selectImage}
							render={ ({open}) => {
								return <img 
									src={imgUrl}
									onClick={open}
									/>;
							}}		
						/>			
					</div>
						<div class="title-image__wrapper">
							<RichText 
								className="title-image__title"
								tagName="h2"
								placeholder="title"
								value={heading}
								onChange={changeHeading}
							/>
					</div>
				</div>
			</div>,
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const {
			attributes: {
				heading,
				imgUrl 
			}
		 } = props;
	
		return (
			<div class="content title-image">
				<div class="grid-container title-image__container">
					<div class="title-image__image">
						<img src={imgUrl} /> 		
					</div>
					<div class="title-image__wrapper">
						<RichText.Content
							className="title-image__title"
							tagName="h2"
							placeholder={__('Title')}
							value={heading} 
						/>
					</div>
				</div>
			</div>
		);}
} );

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
registerBlockType( 'cgb/block-mim-img', {  
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'image' ), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'mim-img — CGB Block' ),
		__( 'CGB Example' ), 
		__( 'create-guten-block' ),
	], 
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/300x200'
		},
		isFullWidth: {
			type: 'boolean'
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
		const { attributes: { isFullWidth, imgUrl }, setAttributes } = props;


		function selectImage(value) {
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}
	
		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Full width', 'jsforwpblocks' ) }
				>
					<PanelRow>
						<label
							htmlFor="high-contrast-form-toggle"
						>
							{ __( 'Full width', 'jsforwpblocks' ) }
						</label>
						<FormToggle
							id="high-contrast-form-toggle"
							label={ __( 'image is full width', 'jsforwpblocks' ) }
							checked={ isFullWidth }
							onChange={ () => setAttributes( {isFullWidth: ! isFullWidth } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>, 
			<div className={!isFullWidth ? 'image image--content-with' : 'image image--full-with'} >
				<MediaUpload 
					onSelect={selectImage}
					render={ ({open}) => {
						return <img 
							src={imgUrl}
							onClick={open}
							/>;
					}}
					/>
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
				isFullWidth,
				imgUrl
			}
		 } = props;
	
		return (
			<div className={!isFullWidth ? 'image image--content-with' : 'image image--full-with'} >
				<img src={imgUrl} />
			</div>
		);}
} );

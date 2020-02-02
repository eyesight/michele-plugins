/**
 * BLOCK: mim-test
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, MediaUpload } = wp.blockEditor;  
const { TextControl } = wp.components;

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
	title: __( 'Bild unbearbeitbar' ), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
		}, 
		text: {
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
		const { attributes: { isFullWidth, imgUrl, text }, setAttributes } = props;
		function selectImage(value){
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}

		function onChangeText(newText){
            setAttributes( { text: newText } );
        };
	
		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Image size', 'jsforwpblocks' ) }
				>
					<PanelRow>
						<label
							htmlFor="img-size-form-toggle"
						>
							{ __( 'Full width', 'jsforwpblocks' ) }
						</label>
						<FormToggle
							id="img-size-form-toggle"
							label={ __( 'image is full width', 'jsforwpblocks' ) }
							checked={ isFullWidth }
							onChange={ () => setAttributes( {isFullWidth: ! isFullWidth } ) }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Alt-text', 'alttxt' ) }
				>
					<PanelRow>
						<label
							htmlFor="high-contrast-form-toggle"
						>
						</label>
						<TextControl
							id="alt-ext"
							label={ __( 'alt-text', 'alttext' ) }
							value={ text }
							help="Text for screenreader. Leave blank when image is just used ad"
							onChange={ onChangeText } 
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>, 
			<figure className={!isFullWidth ? 'image image--content-with' : 'image image--full-with'} >
				<MediaUpload 
					onSelect={selectImage}
					render={ ({open}) => {
						return <img 
							src={imgUrl}
							onClick={open}
							/>;
					}} 
					/>
			</figure>,
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
				imgUrl,
				text
			}
		 } = props;
	
		return (
			<figure className={!isFullWidth ? 'image image--content-with' : 'image image--full-with'} >
				<img src={imgUrl} alt={text} />
			</figure>
		);}
} );

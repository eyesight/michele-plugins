/**
 * BLOCK: mim-test
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, MediaUpload } = wp.blockEditor;  

const { PanelBody, PanelRow, FormToggle, TextControl } = wp.components; 


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
registerBlockType( 'cgb/block-mim-img-txt', { 
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'image with text' ), // Block title.
	icon: 'media-spreadsheet', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'image with text' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/400x300'
		},
		
		bodyContent: {
			type: 'string' 
		},
		
		heading: { 
			type: 'string'
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
		const { attributes: { imgUrl, bodyContent, heading, text }, setAttributes } = props;


		function selectImage(value) {
			console.log(value);
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}
	
		// we create a function that will take the changes from RichText
		// and update the attributes
		function changeBodyContent(changes) {
			setAttributes({
				bodyContent: changes
			})
		}
	
		function changeHeading(heading) {
			// using some nice js features instead of typing
			setAttributes({ heading: heading });
		}

		function onChangeText(newText){
            setAttributes( { text: newText } );
        };
	
		return [
			<InspectorControls>
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
							help="Text ist für Screenreader und nicht sichtbar. Leer lassen, wenn das Bild rein dekorativ ist."
							onChange={ onChangeText } 
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>, 
			<div class="content image-with-text">
				<div class="grid-container image-with-text__container">
					<figure class="image-with-text__img">
						<MediaUpload 
							onSelect={selectImage}
							render={ ({open}) => {
								return <img 
									src={imgUrl}
									onClick={open}
									/>;
							}}		
						/>			
					</figure> 
						<div class="image-with-text__text">
							<RichText 
								className="image-with-text__cat"
								tagName="p"
								placeholder="title"
								value={heading}
								onChange={changeHeading}
							/>
							<RichText 
								className="image-with-text__txt"
								tagName="p"
								placeholder="Enter your text here"
								value={bodyContent}
								onChange={changeBodyContent}
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
				bodyContent,
				heading,
				imgUrl,
				text
			}
		 } = props;
	
		return (
			<div class="content image-with-text">
				<div class="grid-container image-with-text__container">
					<figure class="image-with-text__img">
						<img src={imgUrl} alt={text} /> 		
					</figure>
					<div class="image-with-text__text">
						<RichText.Content
							className="image-with-text__cat"
							tagName="p"
							placeholder={__('Title')}
							value={heading}
						/>

						<RichText.Content 
							className="image-with-text__txt"
							tagName="p"
							placeholder={__('Text')}
							value={bodyContent}
						/>
					</div>
				</div>
			</div>
		);}
} );

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
registerBlockType( 'cgb/block-mim-img-title', { 
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'title with image' ), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'title with image' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ), 
	],
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/400x300'
		},
	
		heading: { 
			type: 'string'
		},

		text: {
			type: 'string'
		},
		isBig: {
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
		const { attributes: { imgUrl, heading, text, isBig }, setAttributes } = props;


		function selectImage(value) {
			setAttributes({
				imgUrl: value.sizes.full.url,
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
							help="Text for screenreader. Leave blank when image is just used ad"
							onChange={ onChangeText } 
						/>
					</PanelRow>
					<PanelRow>
						<label
							htmlFor="title-size-form-toggle"
						>
							{ __( 'Big Title', 'jsforwpblocks' ) }
						</label>
						<FormToggle
							id="title-size-form-toggle"
							label={ __( 'big title', 'jsforwpblocks' ) }
							checked={ isBig }
							onChange={ () => setAttributes( {isBig: ! isBig } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>, 
			<div class="content title-image">
				<div class="grid-container title-image__container">
					<figure class="title-image__image">
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
						<div className={!isBig ? 'title-image__wrapper' : 'title-image__wrapper title-image__wrapper--big'}>
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
				imgUrl,
				text,
				isBig
			}
		 } = props;
	
		return (
			<div class="content title-image">
				<div class="grid-container title-image__container">
					<figure class="title-image__image">
						<img src={imgUrl} alt={text} /> 		
					</figure>
					<div className={!isBig ? 'title-image__wrapper' : 'title-image__wrapper title-image__wrapper--big'}>
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

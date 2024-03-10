/**
 * BLOCK: mim-test
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, MediaUpload } = wp.blockEditor;  
const { TextControl, RadioControl } = wp.components;
const { useState } = wp.element;

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
registerBlockType( 'cgb/block-mim-img-sizes', {  
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bild div. Grössen' ), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'mim-img — CGB Block' )
	], 
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/300x200'
		},
		text: {
			type: 'string'
		},
		selectedOption: {
            type: 'string',
            default: 'image--col-12',
        },
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
		const { attributes: { imgUrl, text, selectedOption }, setAttributes } = props;

        const onChangeRadio = (option) => {
            setAttributes({ selectedOption: option });
        };

        const options = [
            { label: '100% / 12 Spalten', value: 'image--col-12' },
            { label: '11 Spalten', value: 'image--col-11' },
            { label: '10 Spalten', value: 'image--col-10' },
			{ label: '9 Spalten', value: 'image--col-9' },
            { label: '8 Spalten', value: 'image--col-8' },
            { label: '7 Spalten', value: 'image--col-7' },
            { label: '6 Spalten', value: 'image--col-6' },
            { label: '5 Spalten', value: 'image--col-5' },
            { label: '4 Spalten', value: 'image--col-4' },
			{ label: '4 Spalten', value: 'image--col-3' }
        ];

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
					title={ __( 'Bildgrössen', 'imgsize' ) }
				>
					<PanelRow>
						<RadioControl
							label="Wähle Grösse"
							selected={selectedOption}
							options={options}
							onChange={onChangeRadio}
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
							help="Text for screenreader. Leave blank when image is just used as decorative"
							onChange={ onChangeText } 
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>, 
			<figure className={`image ${selectedOption}`} >
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
				imgUrl,
				text,
				selectedOption
			}
		 } = props;
	
		return (
			<figure className={`image ${selectedOption}`} >
				<img src={imgUrl} alt={text} />
			</figure>
		);}
} );

/**
 * BLOCK: mim-test
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, MediaUpload } = wp.editor; 

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
	title: __( 'mim-img-txt - CGB Block' ), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'mim-img-txt — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		imgUrl: {
			type: 'string',
			default: 'http://placehold.it/500'
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
		const { setAttributes } = props;
		const { attributes } = props;

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
			// { heading: heading }
			setAttributes({ heading });
		}
	
		return [
			<InspectorControls>
				{/* Later, when we have customizable options we will add stuff here! */}
				<div>
					Options
				</div>
			</InspectorControls>,
			<div className='test'> 
				<div className="media">
					<MediaUpload 
					onSelect={selectImage}
					render={ ({open}) => {
						return <img 
							src={attributes.imgUrl}
							onClick={open}
							/>;
					}}
				/>
				</div>
				<div className="copy">
					<RichText 
							className="copy-hd"
							tagName="h2"
							placeholder="Enter your heading"
							value={attributes.heading}
							onChange={changeHeading}
							/>
					{/* Content is replaced by this guy.
					We determin the class name and the html tag that
					we want it to show as. */}
					<RichText 
						className="copy-bd"
						tagName="div"
						placeholder="Enter your text here"
						value={attributes.bodyContent}
						onChange={changeBodyContent}
						/>
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
		const { attributes } = props;
	
		return (
			<div className='test'>
				<div className="media">
					<img src={attributes.imgUrl} />
				</div>
				<div className="copy">
					<RichText.Content 
						class="copy-hd"
						tagName="h2"
						value={attributes.heading}
						/>
					<RichText.Content 
						className="copy-bd" 
						tagName="div" 
						value={attributes.bodyContent} 
						/>
				</div>
			</div>
		);}
} );

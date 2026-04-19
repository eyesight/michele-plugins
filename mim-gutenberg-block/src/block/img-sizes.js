const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	InspectorControls,
	MediaUpload,
	useBlockProps
} = wp.blockEditor;

const {
	TextControl,
	RadioControl,
	PanelBody,
	PanelRow
} = wp.components;

const { Fragment } = wp.element;

registerBlockType('cgb/block-mim-img-sizes', {

	apiVersion: 3,

	title: __('Bild div. Grössen'),
	icon: 'format-image',
	category: 'common',

	keywords: [
		__('mim-img — CGB Block')
	],

	attributes: {

		imgUrl: {
			type: 'string',
			default: 'https://placecats.com/300/200'
		},

		text: {
			type: 'string'
		},

		caption: {
			type: 'string'
		},

		selectedOption: {
			type: 'string',
			default: 'image--col-12'
		}

	},

	edit: (props) => {

		const {
			attributes: {
				imgUrl,
				text,
				selectedOption,
				caption
			},
			setAttributes
		} = props;

		const blockProps = useBlockProps({
			className: `image ${selectedOption}`
		});

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
			{ label: '3 Spalten', value: 'image--col-3' }

		];

		function selectImage(media) {

			if (!media) return;

			const url =
				(media.sizes && media.sizes.full && media.sizes.full.url)
				|| (media.sizes && media.sizes.large && media.sizes.large.url)
				|| media.source_url
				|| media.url
				|| (media.guid && media.guid.rendered);

			if (url) {
				setAttributes({ imgUrl: url });
			}

		}

		function onChangeText(value) {
			setAttributes({ text: value });
		}

		function onChangeCaption(value) {
			setAttributes({ caption: value });
		}

		function onChangeRadio(option) {
			setAttributes({ selectedOption: option });
		}

		return (

			<Fragment>

				<InspectorControls>

					<PanelBody title={__('Bildgrössen')}>

						<PanelRow>

							<RadioControl
								label="Wähle Grösse"
								selected={selectedOption}
								options={options}
								onChange={onChangeRadio}
							/>

						</PanelRow>

					</PanelBody>

					<PanelBody title={__('Bildlegende und Alt-text')}>

						<PanelRow>

							<TextControl
								label={__('Bildlegende')}
								value={caption}
								onChange={onChangeCaption}
							/>

						</PanelRow>

						<PanelRow>

							<TextControl
								label={__('Alt-text')}
								value={text}
								onChange={onChangeText}
							/>

						</PanelRow>

					</PanelBody>

				</InspectorControls>

				<figure {...blockProps}>

					<MediaUpload
						onSelect={selectImage}
						allowedTypes={['image']}
						value={imgUrl}
						render={({ open }) => (
							<button
								type="button"
								onClick={open}
								style={{ padding: 0, border: 0, background: 'none' }}
							>
								<img
									src={imgUrl}
									alt={text}
									style={{ cursor: 'pointer' }}
								/>
							</button>
						)}
					/>

					{caption && (

						<figcaption className="image__caption">
							{caption}
						</figcaption>

					)}

				</figure>

			</Fragment>

		);

	},

	save: (props) => {

		const {
			attributes: {
				imgUrl,
				text,
				selectedOption,
				caption
			}
		} = props;

		const blockProps = useBlockProps.save({
			className: `image ${selectedOption}`
		});

		return (

			<figure {...blockProps}>

				<img
					src={imgUrl}
					alt={text}
				/>

				{caption && (

					<figcaption className="image__caption">
						{caption}
					</figcaption>

				)}

			</figure>

		);

	},

	deprecated: [

		{
			attributes: {
				imgUrl: { type: 'string' },
				selectedOption: { type: 'string' },
				text: { type: 'string' },
				caption: { type: 'string' }
			},

			save: (props) => {

				const {
					imgUrl,
					selectedOption,
					text,
					caption
				} = props.attributes;

				return (

					<figure className={`image ${selectedOption || ''}`}>

						<img
							src={imgUrl}
							alt={text}
						/>

						{caption && (

							<figcaption className="image__caption">
								{caption}
							</figcaption>

						)}

					</figure>

				);

			}

		}

	]

});
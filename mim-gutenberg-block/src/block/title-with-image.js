const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	RichText,
	InspectorControls,
	MediaUpload,
	useBlockProps
} = wp.blockEditor;

const {
	PanelBody,
	PanelRow,
	FormToggle,
	TextControl
} = wp.components;

const { Fragment } = wp.element;

registerBlockType('cgb/block-mim-img-title', {

	apiVersion: 3,

	title: __('title with image'),

	icon: 'align-left',

	category: 'common',

	keywords: [
		__('title with image')
	],

	attributes: {

		imgUrl: {
			type: 'string',
			default: 'https://placecats.com/400/300'
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

	edit: (props) => {

		const {
			attributes: {
				imgUrl,
				heading,
				text,
				isBig
			},
			setAttributes
		} = props;

		const blockProps = useBlockProps();

		function selectImage(value) {

			var url =
				(value &&
					value.sizes &&
					value.sizes.full &&
					value.sizes.full.url)

				|| (value &&
					value.sizes &&
					value.sizes.large &&
					value.sizes.large.url)

				|| (value && value.url)

				|| (value &&
					value.source_url);

			if (url) {

				setAttributes({
					imgUrl: url
				});

			}

		}

		function changeHeading(value) {
			setAttributes({
				heading: value
			});
		}

		function onChangeText(value) {
			setAttributes({
				text: value
			});
		}

		return (

			<Fragment>

				<InspectorControls>

					<PanelBody title={__('Alt-text')}>

						<PanelRow>

							<TextControl
								label={__('alt-text')}
								value={text}
								onChange={onChangeText}
							/>

						</PanelRow>

						<PanelRow>

							<FormToggle
								label={__('Big Title')}
								checked={isBig}

								onChange={() =>
									setAttributes({
										isBig: !isBig
									})
								}
							/>

						</PanelRow>

					</PanelBody>

				</InspectorControls>

				<div {...blockProps}
					className="content title-image"
				>

					<div className="grid-container title-image__container">

						<figure className="title-image__image">

							<MediaUpload
								onSelect={selectImage}

								render={({ open }) => (

									<img
										src={imgUrl}
										onClick={open}
										style={{ cursor: 'pointer' }}
									/>

								)}

							/>

						</figure>

						<div
							className={
								!isBig
									? 'title-image__wrapper'
									: 'title-image__wrapper title-image__wrapper--big'
							}
						>

							<RichText
								className="title-image__title"
								tagName="h2"
								value={heading}
								onChange={changeHeading}
							/>

						</div>

					</div>

				</div>

			</Fragment>

		);

	},

	save: (props) => {

		const {
			attributes: {
				heading,
				imgUrl,
				text,
				isBig
			}
		} = props;

		const blockProps = useBlockProps.save();

		return (

			<div {...blockProps}
				className="content title-image"
			>

				<div className="grid-container title-image__container">

					<figure className="title-image__image">

						<img
							src={imgUrl}
							alt={text}
						/>

					</figure>

					<div
						className={
							!isBig
								? 'title-image__wrapper'
								: 'title-image__wrapper title-image__wrapper--big'
						}
					>

						<RichText.Content
							className="title-image__title"
							tagName="h2"
							value={heading}
						/>

					</div>

				</div>

			</div>

		);

	}

});
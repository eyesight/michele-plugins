const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	InspectorControls,
	TextControl,
	FormToggle,
	useBlockProps
} = wp.blockEditor;

const {
	PanelBody,
	PanelRow
} = wp.components;

registerBlockType('cgb/block-mim-video', {

	apiVersion: 3,

	title: __('Video Youtube/Vimeo'),
	icon: 'format-video',
	category: 'common',

	keywords: [
		__('mim-video — CGB Block'),
		__('video'),
		__('embed')
	],

	attributes: {

		videoUrl: {
			type: 'string',
			default: ''
		},

		isFullWidth: {
			type: 'boolean',
			default: false
		}

	},

	edit: (props) => {

		const { attributes: { isFullWidth, videoUrl }, setAttributes } = props;

		const blockProps = useBlockProps({
			className: isFullWidth
				? 'embedVideo embedVideo--full-width'
				: 'embedVideo'
		});

		function onChangeUrl(value) {
			setAttributes({ videoUrl: value });
		}

		return (

			<div {...blockProps}>

				<InspectorControls>

					<PanelBody title={__('Video Einstellungen')}>

						<PanelRow>

							<FormToggle
								label={__('Full width')}
								checked={isFullWidth}
								onChange={() =>
									setAttributes({ isFullWidth: !isFullWidth })
								}
							/>

						</PanelRow>

					</PanelBody>

					<PanelBody title={__('Video URL / Embed Code')}>

						<PanelRow>

							<TextControl
								label={__('iFrame Code oder URL')}
								value={videoUrl}
								help="YouTube/Vimeo Embed Code einfügen"
								onChange={onChangeUrl}
							/>

						</PanelRow>

					</PanelBody>

				</InspectorControls>

				{videoUrl && (

					<div
						className="embedVideo__inner"
						dangerouslySetInnerHTML={{ __html: videoUrl }}
					/>

				)}

			</div>

		);

	},

	save: (props) => {

		const { attributes: { isFullWidth, videoUrl } } = props;

		const blockProps = useBlockProps.save({
			className: isFullWidth
				? 'embedVideo embedVideo--full-width'
				: 'embedVideo'
		});

		return (

			<div {...blockProps}>

				{videoUrl && (
					<div
						className="embedVideo__inner"
						dangerouslySetInnerHTML={{ __html: videoUrl }}
					/>
				)}

			</div>

		);

	}

});
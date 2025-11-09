const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('cgb/block-mim-accordion-item', {
    title: __('Accordion Item'),
    icon: 'excerpt-view',
    category: 'layout',
    parent: ['cgb/block-mim-accordion'],

    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: '.accordion-item__title',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: '.accordion-item__content-inner',
        },
    },

    edit: ({ attributes: { title, content }, setAttributes }) => {
        return (
            <div className="accordion-item">
                <div className="accordion-item__button js-toggle-accordion">
                    <RichText
                        tagName="h3"
                        className="accordion-item__title"
                        placeholder={__('Accordion Title')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                </div>

                <div className="accordion-item__content">
                    <div className="accordion-item__content-inner">
                        <RichText
                            tagName="div"
                            multiline="p"
                            placeholder={__('Accordion Content')}
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                        />
                    </div>
                </div>
            </div>
        );
    },

    save: ({ attributes: { title, content } }) => {
        return (
            <div className="accordion-item">
                <button className="accordion-item__button js-toggle-accordion">
                    <h3 className="accordion-item__title">
                        <RichText.Content value={title} />
                    </h3>
                </button>

                <div className="accordion-item__content">
                    <div className="accordion-item__content-inner">
                        <RichText.Content value={content} />
                    </div>
                </div>
            </div>
        );
    },
});

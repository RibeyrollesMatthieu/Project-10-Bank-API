interface Props {
  imagegUrl: string;
  imageAlt: string;
  title: string;
  content: string;
}

export const FeatureItem = ({ content, imageAlt, imagegUrl, title }: Props) => {
  return (
    <div className='feature-item'>
      <img src={imagegUrl} alt={imageAlt} className='feature-icon' />
      <h3 className='feature-item-title'>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

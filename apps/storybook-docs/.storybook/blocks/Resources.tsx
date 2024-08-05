import { Unstyled, useOf } from '@storybook/blocks';
import figma from '../../assets/figma.png';
import github from '../../assets/github.png';
import w3c from '../../assets/w3c.png';

export function Resources() {
  const { story } = useOf<'story'>('story');
  const userResources = parseResources(story.parameters?.resources);
  const design = story.parameters?.design
    ? [
        {
          title: 'View design',
          description: 'Figma',
          link: story.parameters.design.url,
          type: 'design',
        },
      ]
    : [];
  const source = story.parameters?.source
    ? [
        {
          title: 'View code',
          description: 'GitHub',
          link: story.parameters.source,
          type: 'source',
        },
      ]
    : [];
  const ariaPattern = story.parameters?.ariaPattern
    ? [
        {
          title: 'View ARIA pattern',
          description: 'W3C',
          link: story.parameters.ariaPattern,
          type: 'ariaPattern',
        },
      ]
    : [];
  const resources = [...design, ...source, ...ariaPattern, ...userResources];

  return (
    <Unstyled>
      <div
        className={
          'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full font-nunito mb-16'
        }
      >
        {resources.map((resource) => (
          <Resource key={resource.title} {...resource} />
        ))}
      </div>
    </Unstyled>
  );
}

type ResourceProps = {
  title: string;
  description?: string;
  link: string;
  type?: string;
};

function Resource({ title, description, link, type }: ResourceProps) {
  return (
    <a
      className={'block'}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={
          'flex items-center rounded-sm border border-block shadow-block transform transition hover:-translate-y-[5px] p-2'
        }
      >
        <div className={'pl-2 pr-4 text-xl'}>
          {type === 'design' ? (
            <img src={figma} alt={'Figma'} className={'size-6'} />
          ) : type === 'source' ? (
            <img src={github} alt={'GitHub'} className={'size-6'} />
          ) : type === 'ariaPattern' ? (
            <img src={w3c} alt={'W3C'} className={'size-6'} />
          ) : (
            '🔗'
          )}
        </div>
        <div className={'flex flex-col'}>
          <h4 className={'font-semibold text-sm'}>{title}</h4>
          <p className={'text-sm'}>{description}</p>
        </div>
      </div>
    </a>
  );
}

function parseResources(resources: unknown): ResourceProps[] {
  function isObject(value: unknown): value is Record<string, unknown> {
    return !(typeof value !== 'object' || value === null);
  }

  function isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  function isResource(value: unknown): value is ResourceProps {
    if (!isObject(value)) {
      return false;
    }

    return isString(value.title) && isString(value.link);
  }

  if (!Array.isArray(resources)) {
    return [];
  }

  return resources.filter((resource) => isResource(resource));
}

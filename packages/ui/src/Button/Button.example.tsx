import { Button } from './Button';

/**
 * Button Component Examples
 *
 * This file demonstrates various Button usage patterns.
 * You can use this as a reference when implementing buttons in your app.
 */

export const ButtonExamples = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        'flex-direction': 'column',
        gap: '1rem',
      }}
    >
      <h2>Button Variants</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button variant='filled'>Filled</Button>
        <Button variant='light'>Light</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='transparent'>Transparent</Button>
        <Button variant='subtle'>Subtle</Button>
        <Button variant='default'>Default</Button>
      </div>

      <h2>Button Colors</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button color='indigo'>Indigo</Button>
        <Button color='red'>Red</Button>
        <Button color='green'>Green</Button>
        <Button color='amber'>Amber</Button>
        <Button color='blue'>Blue</Button>
        <Button color='slate'>Slate</Button>
      </div>

      <h2>Button Sizes</h2>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          'align-items': 'center',
          'flex-wrap': 'wrap',
        }}
      >
        <Button size='sm'>Small</Button>
        <Button size='md'>Medium (Default)</Button>
        <Button size='lg'>Large</Button>
        <Button size='xl'>Extra Large</Button>
      </div>

      <h2>With Sections</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button leftSection='←'>Left Icon</Button>
        <Button rightSection='→'>Right Icon</Button>
        <Button leftSection='←' rightSection='→'>
          Both
        </Button>
      </div>

      <h2>States</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button fullWidth>Full Width</Button>
      </div>

      <h2>Color + Variant Combinations</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button color='red' variant='filled'>
          Red Filled
        </Button>
        <Button color='red' variant='light'>
          Red Light
        </Button>
        <Button color='red' variant='outline'>
          Red Outline
        </Button>
        <Button color='green' variant='filled'>
          Green Filled
        </Button>
        <Button color='green' variant='light'>
          Green Light
        </Button>
        <Button color='green' variant='outline'>
          Green Outline
        </Button>
      </div>

      <h2>Radius Variants</h2>
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button radius='xs'>XS Radius</Button>
        <Button radius='sm'>SM Radius</Button>
        <Button radius='md'>MD Radius</Button>
        <Button radius='lg'>LG Radius</Button>
        <Button radius='xl'>XL Radius</Button>
      </div>
    </div>
  );
};

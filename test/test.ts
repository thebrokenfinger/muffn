import muffin from '../src';
import { expect } from 'chai';

describe('muffin', () => {
  it('should return back simple string', () => {
    expect(muffin.render('Hello World', {})).to.equal('Hello World');
  });

  it('should return back string with data', () => {
    expect(muffin.render('Hello {{name}}', { name: 'John' })).to.equal(
      'Hello John'
    );
  });

  it('should return back string with data and nested object', () => {
    expect(
      muffin.render('Hello {{user.name}}', { user: { name: 'John' } })
    ).to.equal('Hello John');
  });

  it('should render if-conditional block', () => {
    expect(
      muffin.render('{@if user.name}Hello {{user.name}}{/if}', {
        user: { name: 'John' }
      })
    ).to.equal('Hello John');

    expect(
      muffin.render('{@if user.name}Hello {{user.name}}{/if}', {
        user: { name: '' }
      })
    ).to.equal('');
  });

  it('should render if-conditional block with else', () => {
    expect(
      muffin.render('{@if user.name}Hello {{user.name}}{else}Hello{/if}', {
        user: { name: 'John' }
      })
    ).to.equal('Hello John');

    expect(
      muffin.render('{@if user.name}Hello {{user.name}}{else}Hello{/if}', {
        user: { name: '' }
      })
    ).to.equal('Hello');
  });

  it('should render each block', () => {
    expect(
      muffin.render('{@each user in users}Hello {{user.name}}{/each}', {
        users: [{ name: 'John' }, { name: 'Doe' }]
      })
    ).to.equal('Hello JohnHello Doe');
  });
});

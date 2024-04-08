import { Cta } from '@components/standalone/Cta';

interface Props {
  name: string;
  display_balance: string;
  isCurrent?: boolean;
}

export const Account = ({ display_balance, name, isCurrent = false }: Props) => {
  return (
    <section className='account'>
      <div className='account-content-wrapper'>
        <h3 className='account-title'>{name}</h3>
        <p className='account-amount'>{display_balance}</p>
        {/* TODO ask further information on why exactly is the difference between availble and current for more accurate integration */}
        <p className='account-amount-description'>{isCurrent ? 'Current' : 'Available'} Balance</p>
      </div>
      <div className='account-content-wrapper cta-container'>
        <Cta label='View transactions' />
      </div>
    </section>
  );
};

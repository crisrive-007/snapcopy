import { createClient } from '@/lib/supabase/server';

export async function deductCreditAtomically(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // 1. Get current balance
  const { data: balanceData, error: balanceError } = await supabase
    .from('credit_balances')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (balanceError || !balanceData || balanceData.balance < 1) {
    return false;
  }

  // 2. Deduct credit
  const newBalance = balanceData.balance - 1;

  const { error: updateError } = await supabase
    .from('credit_balances')
    .update({ balance: newBalance, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .gte('balance', 1); // Extra safe concurrency condition

  if (updateError) {
    return false;
  }

  // 3. Log transaction
  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: -1,
    transaction_type: 'generation',
    description: 'Generación de contenido con IA'
  });

  return true;
}

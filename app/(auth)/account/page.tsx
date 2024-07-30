import AccountForm from './AccountForm'
import { createClient } from '@/lib/server/importSupabase'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm user={user} />
}
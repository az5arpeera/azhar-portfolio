-- set_updated_at is only ever reached through triggers, so it does not need
-- definer rights, and exposing it over /rest/v1/rpc serves no purpose.

create or replace function set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function set_updated_at() from anon, authenticated;

# Je prends l'identité admin_mytherapist
export PGUSER=spedata
export PGPASSWORD=spedata

sqitch deploy
# sqitch deploy 1.create_tables
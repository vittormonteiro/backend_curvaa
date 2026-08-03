const { spawnSync } = require('child_process');

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status) process.exit(result.status);
}

function getMessage() {
  if (process.env.npm_config_msg) return process.env.npm_config_msg;

  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '-m' || argv[i] === '--msg') {
      return argv[i + 1];
    }
    if (argv[i].startsWith('--msg=')) {
      return argv[i].split('=')[1];
    }
  }
  return null;
}

const message = getMessage();
if (!message) {
  console.error('Commit message required. Use: npm run git:commit -- --msg "mensagem"');
  process.exit(1);
}

run('git', ['add', '.']);
run('git', ['commit', '-m', message]);
run('git', ['push']);

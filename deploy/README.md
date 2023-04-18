# Deployment

## Requirements

A debian based linux server with a docker installation.

## Setup

1. spin up jenkins

```bash
docker-compose -f deploy/docker-compose.yaml up -d
```

1. open jenkins in browser `http://myserver:8080`

1. install suggested plugins

1. create admin user

1. generate ssh key without passphrase

```bash
ssh-keygen -t rsa -b 4096
```

1. add ssh key to github

    1. Dashboard > Settings > Deploy keys
    
    1. select `Add deploy key`
    
    1. enter some title
    
    1. enter public ssh key
    
    ```bash
    # show public key
    cat ~/.ssh/id_rsa.pub
    ```

1. add github.com host key to jenkins

    1. Dashboard > Manage Jenkins > Configure Global Security > Git Host Key Verification Configuration

    1. select `Manually provided keys`
    
    1. add github.com public keys from https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints
    
    ```
    github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl
    github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=
    github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=
    ```
    
    1. save

1. install jenkins plugin `Environment Injector Plugin`

1. create new pipeline job in jenkins by selecting `New Item` > `Pipeline`

1. configure some kind of strategy to discard old builds

1. select `Prepare an environment for the run`

    1. uncheck `Keep Jenkins Environment Variables`

    1. uncheck `Keep Jenkins Build Variables`

    1. paste your environment variables into `Properties Content` as if it was an `.env` file. Use `.env.example` as a template.
    
    1. create a username/password hash for the traefik dashboard and save the credentials somwhere
    ```sh
    # create a password
    openssl rand -hex 24

    # create a username/password hash
    `htpasswd -nb <username> <password>`
    
    # paste the output into TRAEFIK_DASHBOARD_AUTH env var
    ```

1. select `Pipeline script from SCM`

1. select `Git`

1. enter repository url

1. add ssh key to jenkins credentials by selecting `Add` and then `Jenkins` (if this is a public repo you can skip this step)

    1. select `SSH Username with private key`
    
    1. select scope `Global`
    
    1. leave `ID` empty

    1. enter filename or whatever as `Description`

    1. enter jenkins user name as `Username`

    1. enter private ssh key as `Private key` > `Enter directly`

    ```bash
    # show private key
    cat ~/.ssh/id_rsa
    ```
    
    1. enter passphrase for ssh key as `Passphrase`
    
    1. save

1. select `main` branch

1. save

## Webhook

The GitHub Plugin for Jenkins provides a webhook that can be used to trigger builds when a push event is received from GitHub.

1. in the jenkins job activate `Configure` > `Build Triggers` > `GitHub hook trigger for GITScm polling`

1. in the git repo add a webhook to `http://jenkins.example.com/github-webhook/` and select `Just the push event`

1. done.
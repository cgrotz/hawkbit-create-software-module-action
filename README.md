# hawkbit-create-software-module-action

GitHub Action for creating a software module in Eclipse Hawkbit.

## Usage

### Example Workflow file

An example workflow for uploading an artifact to an existing software module:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Create Software Module
      uses: cgrotz/hawkbit-create-software-module-action@v1
      with:
        hawkbit-tenant: ${{ secrets.ROLLOUTS_TENANT }}
        hawkbit-username: ${{ secrets.ROLLOUTS_USERNAME }}
        hawkbit-password: ${{ secrets.ROLLOUTS_PASSWORD }}
        software-module-name: Test
        software-module-type: App
        software-module-version: 1.0.0
```
